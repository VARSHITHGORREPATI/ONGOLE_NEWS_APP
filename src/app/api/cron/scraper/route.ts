import { NextRequest, NextResponse } from 'next/server';
import { runNewsScraperAgent } from '@/lib/ingestion/newsScraperAgent';

/**
 * GET /api/cron/scraper
 * Automated cron job to run news scraper
 * 
 * This endpoint should be called periodically (e.g., every 3 hours)
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

    console.log('🤖 Starting automated news scraper cron job...');
    
    // Run scraper with 3 articles per source
    const result = await runNewsScraperAgent(3);

    return NextResponse.json({
      success: true,
      message: 'Automated news scraper completed',
      data: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Cron scraper error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Cron job failed'
      },
      { status: 500 }
    );
  }
}
