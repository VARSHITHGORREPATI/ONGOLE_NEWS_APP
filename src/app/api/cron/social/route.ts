import { NextRequest, NextResponse } from 'next/server';
import { processSocialQueue, retryFailedPosts } from '@/lib/social/facebook';

/**
 * GET /api/cron/social
 * Cron job to process social media posting queue
 * 
 * This endpoint should be called periodically (e.g., every hour)
 * You can use Vercel Cron Jobs or external cron services
 */
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret (optional but recommended)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Starting scheduled social media posting...');
    
    // Process up to 5 posts
    await processSocialQueue(5);

    // Retry failed posts
    await retryFailedPosts(3);

    return NextResponse.json({
      success: true,
      message: 'Social media posting completed',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Cron social error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Cron job failed'
      },
      { status: 500 }
    );
  }
}
