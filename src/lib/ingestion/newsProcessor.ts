import axios from 'axios';
import * as cheerio from 'cheerio';
import { supabaseAdmin, type Post, type IngestionQueueItem } from '../supabase/client';
import { processArticleWithAI, calculateReadTime } from '../ai/gemini';
import { uploadImageFromUrl, extractImageFromHtml, getPlaceholderImage } from '../cloudinary/upload';

export interface NewsSource {
  url: string;
  name: string;
  language?: 'english' | 'telugu';
}

export interface ProcessedArticle {
  title: string;
  title_en: string;
  summary: string;
  summary_en: string;
  content: string;
  content_en: string;
  image_url: string;
  image_public_id: string | null;
  source_url: string;
  source_name: string;
  category: string;
  tags: string[];
  priority: 'normal' | 'breaking';
  read_time: number;
  ai_generated: boolean;
}

/**
 * Fetch and clean HTML content
 */
export async function fetchArticleContent(url: string): Promise<{
  title: string;
  content: string;
  imageUrl: string | null;
}> {
  try {
    const response = await axios.get(url, {
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);

    // Remove unwanted elements
    $('script, style, nav, header, footer, aside, .advertisement, .ad, .social-share').remove();

    // Extract title
    let title = $('h1').first().text().trim() ||
                $('title').text().trim() ||
                $('meta[property="og:title"]').attr('content') ||
                '';

    // Extract main content
    let content = '';
    const contentSelectors = [
      'article',
      '.article-content',
      '.post-content',
      '.entry-content',
      'main',
      '.content'
    ];

    for (const selector of contentSelectors) {
      const element = $(selector);
      if (element.length > 0) {
        content = element.text().trim();
        if (content.length > 200) break;
      }
    }

    // Fallback: get all paragraphs
    if (!content || content.length < 200) {
      content = $('p').map((_, el) => $(el).text().trim()).get().join('\n\n');
    }

    // Extract image
    let imageUrl = $('meta[property="og:image"]').attr('content') ||
                   $('article img').first().attr('src') ||
                   $('img').first().attr('src') ||
                   null;

    // Make image URL absolute
    if (imageUrl && !imageUrl.startsWith('http')) {
      const urlObj = new URL(url);
      imageUrl = new URL(imageUrl, urlObj.origin).href;
    }

    return {
      title: cleanText(title),
      content: cleanText(content),
      imageUrl
    };
  } catch (error) {
    console.error('Fetch Article Error:', error);
    throw new Error(`Failed to fetch article: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Clean and normalize text
 */
function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ') // Multiple spaces to single space
    .replace(/\n\s*\n/g, '\n\n') // Multiple newlines to double newline
    .trim();
}

/**
 * Check for duplicate articles
 */
export async function checkDuplicate(sourceUrl: string, title: string): Promise<boolean> {
  try {
    // Check exact URL match
    const { data: urlMatch } = await supabaseAdmin
      .from('posts')
      .select('id')
      .eq('source_url', sourceUrl)
      .single();

    if (urlMatch) return true;

    // Check title similarity (simple approach)
    const { data: posts } = await supabaseAdmin
      .from('posts')
      .select('title, title_en')
      .limit(100);

    if (posts) {
      for (const post of posts) {
        const similarity = calculateSimilarity(title, post.title) ||
                          calculateSimilarity(title, post.title_en);
        if (similarity > 0.75) return true;
      }
    }

    return false;
  } catch (error) {
    console.error('Duplicate Check Error:', error);
    return false;
  }
}

/**
 * Calculate text similarity (simple Jaccard similarity)
 */
function calculateSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.toLowerCase().split(/\s+/));
  const words2 = new Set(text2.toLowerCase().split(/\s+/));
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
}

/**
 * Process single article through complete pipeline
 */
export async function processArticle(source: NewsSource): Promise<Post | null> {
  try {
    console.log(`Processing article from: ${source.url}`);

    // 1. Check for duplicates
    const isDuplicate = await checkDuplicate(source.url, '');
    if (isDuplicate) {
      console.log('Duplicate article detected, skipping');
      return null;
    }

    // 2. Fetch content
    const { title, content, imageUrl } = await fetchArticleContent(source.url);
    
    if (!title || !content || content.length < 100) {
      throw new Error('Insufficient content extracted');
    }

    // 3. Check duplicate with actual title
    const isDuplicateTitle = await checkDuplicate(source.url, title);
    if (isDuplicateTitle) {
      console.log('Duplicate title detected, skipping');
      return null;
    }

    // 4. Process with AI
    console.log('Processing with AI...');
    const aiResult = await processArticleWithAI(title, content, source.language);

    // 5. Upload image to Cloudinary
    console.log('Uploading image...');
    let finalImageUrl = getPlaceholderImage();
    let imagePublicId: string | null = null;

    if (imageUrl) {
      try {
        const uploadResult = await uploadImageFromUrl(imageUrl);
        finalImageUrl = uploadResult.secureUrl;
        imagePublicId = uploadResult.publicId;
      } catch (error) {
        console.error('Image upload failed, using placeholder:', error);
      }
    }

    // 6. Calculate read time
    const readTime = calculateReadTime(aiResult.teluguContent);

    // 7. Insert into database
    console.log('Saving to database...');
    const { data: post, error } = await supabaseAdmin
      .from('posts')
      .insert({
        title: aiResult.teluguTitle,
        title_en: aiResult.englishTitle,
        summary: aiResult.teluguSummary,
        summary_en: aiResult.englishSummary,
        content: aiResult.teluguContent,
        content_en: aiResult.englishContent,
        image_url: finalImageUrl,
        image_public_id: imagePublicId,
        source_url: source.url,
        source_name: source.name,
        category: aiResult.category,
        tags: aiResult.tags,
        priority: aiResult.priority,
        read_time: readTime,
        language: 'both',
        published: true,
        published_at: new Date().toISOString(),
        ai_generated: true,
        ai_summary_generated: true
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Database insert failed: ${error.message}`);
    }

    console.log(`Article processed successfully: ${post.id}`);
    return post;
  } catch (error) {
    console.error('Process Article Error:', error);
    throw error;
  }
}

/**
 * Add article to ingestion queue
 */
export async function addToIngestionQueue(source: NewsSource): Promise<IngestionQueueItem> {
  const { data, error } = await supabaseAdmin
    .from('ingestion_queue')
    .insert({
      source_url: source.url,
      source_name: source.name,
      status: 'pending'
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to add to queue: ${error.message}`);
  }

  return data;
}

/**
 * Process ingestion queue
 */
export async function processIngestionQueue(limit: number = 10): Promise<void> {
  try {
    // Get pending items
    const { data: queueItems, error } = await supabaseAdmin
      .from('ingestion_queue')
      .select('*')
      .eq('status', 'pending')
      .lt('retry_count', 3)
      .order('created_at', { ascending: true })
      .limit(limit);

    if (error || !queueItems || queueItems.length === 0) {
      console.log('No items in queue to process');
      return;
    }

    console.log(`Processing ${queueItems.length} items from queue`);

    for (const item of queueItems) {
      try {
        // Update status to processing
        await supabaseAdmin
          .from('ingestion_queue')
          .update({ status: 'processing' })
          .eq('id', item.id);

        // Process article
        const post = await processArticle({
          url: item.source_url,
          name: item.source_name || 'Unknown Source'
        });

        if (post) {
          // Mark as completed
          await supabaseAdmin
            .from('ingestion_queue')
            .update({
              status: 'completed',
              post_id: post.id,
              processed_at: new Date().toISOString()
            })
            .eq('id', item.id);
        } else {
          // Duplicate or skipped
          await supabaseAdmin
            .from('ingestion_queue')
            .update({
              status: 'completed',
              error_message: 'Duplicate article',
              processed_at: new Date().toISOString()
            })
            .eq('id', item.id);
        }
      } catch (error) {
        console.error(`Failed to process queue item ${item.id}:`, error);
        
        // Update retry count and error
        await supabaseAdmin
          .from('ingestion_queue')
          .update({
            status: 'failed',
            error_message: error instanceof Error ? error.message : 'Unknown error',
            retry_count: item.retry_count + 1
          })
          .eq('id', item.id);
      }
    }

    console.log('Queue processing completed');
  } catch (error) {
    console.error('Process Queue Error:', error);
  }
}

/**
 * Batch process multiple articles
 */
export async function batchProcessArticles(sources: NewsSource[]): Promise<{
  successful: number;
  failed: number;
  duplicates: number;
}> {
  const results = {
    successful: 0,
    failed: 0,
    duplicates: 0
  };

  for (const source of sources) {
    try {
      const post = await processArticle(source);
      if (post) {
        results.successful++;
      } else {
        results.duplicates++;
      }
    } catch (error) {
      console.error(`Failed to process ${source.url}:`, error);
      results.failed++;
    }
  }

  return results;
}
