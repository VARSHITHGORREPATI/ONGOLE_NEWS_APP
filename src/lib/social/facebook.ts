import axios from 'axios';
import { supabaseAdmin } from '../supabase/client';
import { generateSocialCaption } from '../ai/gemini';

export interface FacebookPostResult {
  success: boolean;
  postId?: string;
  error?: string;
}

export interface InstagramPostResult {
  success: boolean;
  mediaId?: string;
  error?: string;
}

/**
 * Post to Facebook Page
 */
export async function postToFacebook(
  postId: string,
  title: string,
  summary: string,
  imageUrl: string,
  articleUrl: string
): Promise<FacebookPostResult> {
  try {
    const pageAccessToken = process.env.META_PAGE_ACCESS_TOKEN;
    const pageId = process.env.META_PAGE_ID;

    if (!pageAccessToken || !pageId) {
      throw new Error('Facebook credentials not configured');
    }

    // Generate caption
    const caption = await generateSocialCaption(title, summary, 'telugu');

    // Post to Facebook
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${pageId}/feed`,
      {
        message: caption,
        link: articleUrl,
        // Facebook will automatically fetch the image from the link
      },
      {
        params: {
          access_token: pageAccessToken
        }
      }
    );

    const fbPostId = response.data.id;

    // Log success
    await logSocialPost(postId, 'facebook', 'success', fbPostId);

    return {
      success: true,
      postId: fbPostId
    };
  } catch (error) {
    console.error('Facebook Post Error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Log failure
    await logSocialPost(postId, 'facebook', 'failed', null, errorMessage);

    return {
      success: false,
      error: errorMessage
    };
  }
}

/**
 * Post to Instagram Business Account
 */
export async function postToInstagram(
  postId: string,
  title: string,
  summary: string,
  imageUrl: string,
  articleUrl: string
): Promise<InstagramPostResult> {
  try {
    const pageAccessToken = process.env.META_PAGE_ACCESS_TOKEN;
    const instagramBusinessId = process.env.INSTAGRAM_BUSINESS_ID;

    if (!pageAccessToken || !instagramBusinessId) {
      throw new Error('Instagram credentials not configured');
    }

    // Generate caption
    const caption = await generateSocialCaption(title, summary, 'telugu');

    // Step 1: Create media container
    const containerResponse = await axios.post(
      `https://graph.facebook.com/v18.0/${instagramBusinessId}/media`,
      {
        image_url: imageUrl,
        caption: caption,
        access_token: pageAccessToken
      }
    );

    const containerId = containerResponse.data.id;

    // Step 2: Wait for container to be ready (Instagram needs time to process)
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Step 3: Publish the media
    const publishResponse = await axios.post(
      `https://graph.facebook.com/v18.0/${instagramBusinessId}/media_publish`,
      {
        creation_id: containerId,
        access_token: pageAccessToken
      }
    );

    const mediaId = publishResponse.data.id;

    // Log success
    await logSocialPost(postId, 'instagram', 'success', mediaId);

    return {
      success: true,
      mediaId
    };
  } catch (error) {
    console.error('Instagram Post Error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Log failure
    await logSocialPost(postId, 'instagram', 'failed', null, errorMessage);

    return {
      success: false,
      error: errorMessage
    };
  }
}

/**
 * Post to both Facebook and Instagram
 */
export async function postToAllPlatforms(
  postId: string,
  title: string,
  summary: string,
  imageUrl: string,
  articleUrl: string
): Promise<{
  facebook: FacebookPostResult;
  instagram: InstagramPostResult;
}> {
  const [facebook, instagram] = await Promise.allSettled([
    postToFacebook(postId, title, summary, imageUrl, articleUrl),
    postToInstagram(postId, title, summary, imageUrl, articleUrl)
  ]);

  return {
    facebook: facebook.status === 'fulfilled' ? facebook.value : { success: false, error: 'Promise rejected' },
    instagram: instagram.status === 'fulfilled' ? instagram.value : { success: false, error: 'Promise rejected' }
  };
}

/**
 * Log social media post to database
 */
async function logSocialPost(
  postId: string,
  platform: 'facebook' | 'instagram',
  status: 'success' | 'failed',
  platformPostId: string | null,
  errorMessage?: string
): Promise<void> {
  try {
    await supabaseAdmin.from('social_logs').insert({
      post_id: postId,
      platform,
      status,
      platform_post_id: platformPostId,
      error_message: errorMessage || null
    });

    // Update post's social status
    if (status === 'success') {
      await supabaseAdmin
        .from('posts')
        .update({
          is_posted_to_social: true,
          social_posted_at: new Date().toISOString()
        })
        .eq('id', postId);
    }
  } catch (error) {
    console.error('Failed to log social post:', error);
  }
}

/**
 * Retry failed social posts
 */
export async function retryFailedPosts(maxRetries: number = 3): Promise<void> {
  try {
    // Get failed posts that haven't exceeded retry limit
    const { data: failedLogs } = await supabaseAdmin
      .from('social_logs')
      .select('*, posts(*)')
      .eq('status', 'failed')
      .lt('retry_count', maxRetries)
      .order('created_at', { ascending: true })
      .limit(10);

    if (!failedLogs || failedLogs.length === 0) {
      console.log('No failed posts to retry');
      return;
    }

    console.log(`Retrying ${failedLogs.length} failed posts`);

    for (const log of failedLogs) {
      const post = log.posts;
      if (!post) continue;

      const articleUrl = `${process.env.NEXT_PUBLIC_APP_URL}/article/${post.id}`;

      try {
        if (log.platform === 'facebook') {
          await postToFacebook(post.id, post.title, post.summary, post.image_url, articleUrl);
        } else if (log.platform === 'instagram') {
          await postToInstagram(post.id, post.title, post.summary, post.image_url, articleUrl);
        }

        // Update retry count
        await supabaseAdmin
          .from('social_logs')
          .update({
            retry_count: log.retry_count + 1,
            last_retry_at: new Date().toISOString()
          })
          .eq('id', log.id);
      } catch (error) {
        console.error(`Failed to retry post ${post.id}:`, error);
      }
    }
  } catch (error) {
    console.error('Retry Failed Posts Error:', error);
  }
}

/**
 * Process social media queue
 * Posts unpublished articles to social media
 */
export async function processSocialQueue(limit: number = 5): Promise<void> {
  try {
    // Get published posts that haven't been posted to social media
    const { data: posts } = await supabaseAdmin
      .from('posts')
      .select('*')
      .eq('published', true)
      .eq('is_posted_to_social', false)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (!posts || posts.length === 0) {
      console.log('No posts in social queue');
      return;
    }

    console.log(`Processing ${posts.length} posts for social media`);

    for (const post of posts) {
      const articleUrl = `${process.env.NEXT_PUBLIC_APP_URL}/article/${post.id}`;

      try {
        await postToAllPlatforms(
          post.id,
          post.title,
          post.summary,
          post.image_url || '',
          articleUrl
        );

        console.log(`Posted article ${post.id} to social media`);
      } catch (error) {
        console.error(`Failed to post article ${post.id}:`, error);
      }

      // Add delay between posts to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  } catch (error) {
    console.error('Process Social Queue Error:', error);
  }
}
