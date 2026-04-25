import { NextRequest, NextResponse } from 'next/server';
import { processIngestionQueue } from '@/lib/ingestion/newsProcessor';

/**
 * GET /api/cron/ingest
 * Cron job to process news ingestion queue
 * 
 * This endpoint should be called periodically (e.g., every 2 hours)
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

    console.log('Starting scheduled news ingestion...');
    
    // Process up to 20 items from queue
    await processIngestionQueue(20);

    return NextResponse.json({
      success: true,
      message: 'News ingestion completed',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Cron ingest error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Cron job failed'
      },
      { status: 500 }
    );
  }
}
