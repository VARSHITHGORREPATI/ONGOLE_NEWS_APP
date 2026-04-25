import { NextRequest, NextResponse } from 'next/server';
import { postToFacebook, postToInstagram, postToAllPlatforms, processSocialQueue } from '@/lib/social/facebook';
import { supabaseAdmin } from '@/lib/supabase/client';

/**
 * POST /api/social/post
 * Post article to social media
 * 
 * Body options:
 * 1. Single post: { postId: string, platforms?: ['facebook', 'instagram'] }
 * 2. Process queue: { processQueue: true, limit?: number }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Option 1: Process queue
    if (body.processQueue) {
      const limit = body.limit || 5;
      await processSocialQueue(limit);
      
      return NextResponse.json({
        success: true,
        message: `Processing up to ${limit} posts from social queue`
      });
    }

    // Option 2: Post specific article
    if (body.postId) {
      // Fetch post details
      const { data: post, error } = await supabaseAdmin
        .from('posts')
        .select('*')
        .eq('id', body.postId)
        .single();

      if (error || !post) {
        return NextResponse.json(
          { success: false, error: 'Post not found' },
          { status: 404 }
        );
      }

      const articleUrl = `${process.env.NEXT_PUBLIC_APP_URL}/article/${post.id}`;
      const platforms = body.platforms || ['facebook', 'instagram'];

      let results: any = {};

      // Post to specified platforms
      if (platforms.includes('facebook') && platforms.includes('instagram')) {
        results = await postToAllPlatforms(
          post.id,
          post.title,
          post.summary,
          post.image_url || '',
          articleUrl
        );
      } else if (platforms.includes('facebook')) {
        results.facebook = await postToFacebook(
          post.id,
          post.title,
          post.summary,
          post.image_url || '',
          articleUrl
        );
      } else if (platforms.includes('instagram')) {
        results.instagram = await postToInstagram(
          post.id,
          post.title,
          post.summary,
          post.image_url || '',
          articleUrl
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Posted to social media',
        results
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid request body. Provide postId or processQueue flag'
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('POST /api/social/post error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to post to social media'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/social/post
 * Get social media posting stats
 */
export async function GET() {
  try {
    const { data: stats } = await supabaseAdmin
      .from('social_logs')
      .select('platform, status')
      .then(({ data }) => {
        const counts: any = {
          facebook: { success: 0, failed: 0, pending: 0 },
          instagram: { success: 0, failed: 0, pending: 0 }
        };
        
        data?.forEach(log => {
          if (counts[log.platform]) {
            counts[log.platform][log.status]++;
          }
        });
        
        return { data: counts };
      });

    // Get posts waiting to be posted
    const { count: queueCount } = await supabaseAdmin
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('published', true)
      .eq('is_posted_to_social', false);

    return NextResponse.json({
      success: true,
      data: {
        stats,
        queueCount: queueCount || 0
      }
    });
  } catch (error) {
    console.error('GET /api/social/post error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get social stats'
      },
      { status: 500 }
    );
  }
}
