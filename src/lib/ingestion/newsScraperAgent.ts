/**
 * AI News Scraper Agent
 * Automatically fetches news from configured sources and posts them
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import { NEWS_SOURCES, type NewsSource } from './newsSources';
import { processArticle, checkDuplicate } from './newsProcessor';
import { supabaseAdmin } from '../supabase/client';

export interface ScraperResult {
  source: string;
  articlesFound: number;
  articlesProcessed: number;
  duplicates: number;
  errors: number;
  successfulPosts: string[];
  failedUrls: string[];
}

/**
 * Extract article URLs from a news source homepage
 */
async function extractArticleUrls(source: NewsSource, limit: number = 5): Promise<string[]> {
  try {
    console.log(`📰 Fetching articles from ${source.name}...`);

    const response = await axios.get(source.url, {
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    });

    const $ = cheerio.load(response.data);
    const urls: string[] = [];
    const seenUrls = new Set<string>();

    // Try multiple selectors to find article links
    const selectors = [
      source.selectors?.articleLinks,
      'article a[href]',
      '.article a[href]',
      '.news-item a[href]',
      '.story a[href]',
      'a[href*="/news/"]',
      'a[href*="/article/"]',
      'a[href*="/story/"]',
      'h2 a[href]',
      'h3 a[href]'
    ].filter(Boolean);

    for (const selector of selectors) {
      $(selector as string).each((_, element) => {
        let href = $(element).attr('href');
        if (!href) return;

        // Make URL absolute
        if (href.startsWith('/')) {
          const urlObj = new URL(source.url);
          href = `${urlObj.protocol}//${urlObj.host}${href}`;
        } else if (!href.startsWith('http')) {
          const urlObj = new URL(source.url);
          href = `${urlObj.protocol}//${urlObj.host}/${href}`;
        }

        // Filter valid article URLs
        if (
          href.startsWith('http') &&
          !href.includes('#') &&
          !href.includes('javascript:') &&
          !href.includes('mailto:') &&
          !seenUrls.has(href) &&
          (href.includes('/news/') || 
           href.includes('/article/') || 
           href.includes('/story/') ||
           href.includes(source.url.split('.com')[0]))
        ) {
          seenUrls.add(href);
          urls.push(href);
        }
      });

      if (urls.length >= limit) break;
    }

    const uniqueUrls = Array.from(new Set(urls)).slice(0, limit);
    console.log(`   Found ${uniqueUrls.length} article URLs`);
    
    return uniqueUrls;
  } catch (error) {
    console.error(`❌ Failed to extract URLs from ${source.name}:`, error);
    return [];
  }
}

/**
 * Process articles from a single news source
 */
async function processNewsSource(
  source: NewsSource,
  articlesPerSource: number = 5
): Promise<ScraperResult> {
  const result: ScraperResult = {
    source: source.name,
    articlesFound: 0,
    articlesProcessed: 0,
    duplicates: 0,
    errors: 0,
    successfulPosts: [],
    failedUrls: []
  };

  try {
    // Extract article URLs
    const articleUrls = await extractArticleUrls(source, articlesPerSource);
    result.articlesFound = articleUrls.length;

    if (articleUrls.length === 0) {
      console.log(`⚠️  No articles found for ${source.name}`);
      return result;
    }

    // Process each article
    for (const url of articleUrls) {
      try {
        console.log(`   Processing: ${url.substring(0, 60)}...`);

        // Check if already processed
        const isDuplicate = await checkDuplicate(url, '');
        if (isDuplicate) {
          console.log(`   ⏭️  Skipped (duplicate)`);
          result.duplicates++;
          continue;
        }

        // Process article
        const post = await processArticle({
          url,
          name: source.name,
          language: source.language
        });

        if (post) {
          result.articlesProcessed++;
          result.successfulPosts.push(post.id);
          console.log(`   ✅ Posted: ${post.title.substring(0, 50)}...`);
        } else {
          result.duplicates++;
          console.log(`   ⏭️  Skipped (duplicate or insufficient content)`);
        }

        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        result.errors++;
        result.failedUrls.push(url);
        console.error(`   ❌ Failed to process article:`, error instanceof Error ? error.message : error);
      }
    }
  } catch (error) {
    console.error(`❌ Failed to process source ${source.name}:`, error);
    result.errors++;
  }

  return result;
}

/**
 * Run the news scraper agent
 * Fetches and processes news from all configured sources
 */
export async function runNewsScraperAgent(
  articlesPerSource: number = 5,
  sourcesToProcess?: string[]
): Promise<{
  totalArticlesFound: number;
  totalArticlesProcessed: number;
  totalDuplicates: number;
  totalErrors: number;
  results: ScraperResult[];
}> {
  console.log('🤖 Starting AI News Scraper Agent...\n');
  console.log(`📊 Configuration:`);
  console.log(`   Articles per source: ${articlesPerSource}`);
  console.log(`   Total sources: ${NEWS_SOURCES.length}\n`);

  const results: ScraperResult[] = [];
  let sources = NEWS_SOURCES;

  // Filter sources if specified
  if (sourcesToProcess && sourcesToProcess.length > 0) {
    sources = NEWS_SOURCES.filter(s => sourcesToProcess.includes(s.name));
    console.log(`   Processing only: ${sourcesToProcess.join(', ')}\n`);
  }

  // Process each source
  for (const source of sources) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📰 Processing: ${source.name} (${source.language})`);
    console.log(`   URL: ${source.url}`);
    console.log(`   Category: ${source.category}`);
    console.log(`${'='.repeat(60)}\n`);

    const result = await processNewsSource(source, articlesPerSource);
    results.push(result);

    // Summary for this source
    console.log(`\n📊 ${source.name} Summary:`);
    console.log(`   Found: ${result.articlesFound}`);
    console.log(`   Processed: ${result.articlesProcessed}`);
    console.log(`   Duplicates: ${result.duplicates}`);
    console.log(`   Errors: ${result.errors}`);

    // Add delay between sources
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  // Calculate totals
  const summary = {
    totalArticlesFound: results.reduce((sum, r) => sum + r.articlesFound, 0),
    totalArticlesProcessed: results.reduce((sum, r) => sum + r.articlesProcessed, 0),
    totalDuplicates: results.reduce((sum, r) => sum + r.duplicates, 0),
    totalErrors: results.reduce((sum, r) => sum + r.errors, 0),
    results
  };

  // Final summary
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🎉 AI News Scraper Agent Complete!`);
  console.log(`${'='.repeat(60)}`);
  console.log(`📊 Overall Summary:`);
  console.log(`   Total articles found: ${summary.totalArticlesFound}`);
  console.log(`   Successfully processed: ${summary.totalArticlesProcessed}`);
  console.log(`   Duplicates skipped: ${summary.totalDuplicates}`);
  console.log(`   Errors: ${summary.totalErrors}`);
  console.log(`${'='.repeat(60)}\n`);

  // Log to database
  try {
    await supabaseAdmin.from('ingestion_queue').insert({
      source_url: 'AI_SCRAPER_AGENT',
      source_name: 'Automated Scraper',
      raw_title: `Scraper run: ${new Date().toISOString()}`,
      raw_content: JSON.stringify(summary),
      status: 'completed',
      processed_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to log scraper run:', error);
  }

  return summary;
}

/**
 * Run scraper for specific categories
 */
export async function runScraperByCategory(
  category: 'local' | 'state' | 'national',
  articlesPerSource: number = 5
) {
  const sources = NEWS_SOURCES.filter(s => s.category === category);
  const sourceNames = sources.map(s => s.name);
  
  console.log(`🎯 Running scraper for category: ${category}`);
  console.log(`   Sources: ${sourceNames.join(', ')}\n`);
  
  return runNewsScraperAgent(articlesPerSource, sourceNames);
}

/**
 * Run scraper for specific language
 */
export async function runScraperByLanguage(
  language: 'english' | 'telugu',
  articlesPerSource: number = 5
) {
  const sources = NEWS_SOURCES.filter(s => s.language === language);
  const sourceNames = sources.map(s => s.name);
  
  console.log(`🌐 Running scraper for language: ${language}`);
  console.log(`   Sources: ${sourceNames.join(', ')}\n`);
  
  return runNewsScraperAgent(articlesPerSource, sourceNames);
}
