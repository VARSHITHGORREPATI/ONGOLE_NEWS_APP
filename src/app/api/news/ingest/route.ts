import { NextRequest, NextResponse } from 'next/server';
import { processArticle, addToIngestionQueue, processIngestionQueue } from '@/lib/ingestion/newsProcessor';

/**
 * POST /api/news/ingest
 * Trigger news ingestion
 * 
 * Body options:
 * 1. Single URL: { url: string, name: string, language?: 'english' | 'telugu' }
 * 2. Multiple URLs: { sources: Array<{ url, name, language? }> }
 * 3. Process queue: { processQueue: true, limit?: number }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Option 1: Process queue
    if (body.processQueue) {
      const limit = body.limit || 10;
      await processIngestionQueue(limit);
      
      return NextResponse.json({
        success: true,
        message: `Processing up to ${limit} items from queue`
      });
    }

    // Option 2: Single URL - process immediately
    if (body.url) {
      const post = await processArticle({
        url: body.url,
        name: body.name || 'Unknown Source',
        language: body.language || 'english'
      });

      if (!post) {
        return NextResponse.json({
          success: false,
          message: 'Article was duplicate or could not be processed'
        }, { status: 400 });
      }

      return NextResponse.json({
        success: true,
        message: 'Article processed successfully',
        data: post
      }, { status: 201 });
    }

    // Option 3: Multiple URLs - add to queue
    if (body.sources && Array.isArray(body.sources)) {
      const results = [];
      
      for (const source of body.sources) {
        try {
          const queueItem = await addToIngestionQueue({
            url: source.url,
            name: source.name || 'Unknown Source',
            language: source.language || 'english'
          });
          results.push({ success: true, queueItem });
        } catch (error) {
          results.push({
            success: false,
            url: source.url,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }

      return NextResponse.json({
        success: true,
        message: `Added ${results.filter(r => r.success).length} articles to queue`,
        results
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid request body. Provide url, sources array, or processQueue flag'
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('POST /api/news/ingest error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to ingest news'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/news/ingest
 * Get ingestion queue status
 */
export async function GET() {
  try {
    const { supabaseAdmin } = await import('@/lib/supabase/client');
    
    const { data: stats } = await supabaseAdmin
      .from('ingestion_queue')
      .select('status')
      .then(({ data }) => {
        const counts = {
          pending: 0,
          processing: 0,
          completed: 0,
          failed: 0
        };
        
        data?.forEach(item => {
          counts[item.status as keyof typeof counts]++;
        });
        
        return { data: counts };
      });

    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('GET /api/news/ingest error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get queue status'
      },
      { status: 500 }
    );
  }
}
