import { NextRequest, NextResponse } from 'next/server';
import { runNewsScraperAgent, runScraperByCategory, runScraperByLanguage } from '@/lib/ingestion/newsScraperAgent';

/**
 * POST /api/scraper/run
 * Run the AI news scraper agent
 * 
 * Body options:
 * 1. Run all sources: { articlesPerSource?: number }
 * 2. Run by category: { category: 'local' | 'state' | 'national', articlesPerSource?: number }
 * 3. Run by language: { language: 'english' | 'telugu', articlesPerSource?: number }
 * 4. Run specific sources: { sources: string[], articlesPerSource?: number }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const articlesPerSource = body.articlesPerSource || 5;

    let result;

    // Run by category
    if (body.category) {
      result = await runScraperByCategory(body.category, articlesPerSource);
    }
    // Run by language
    else if (body.language) {
      result = await runScraperByLanguage(body.language, articlesPerSource);
    }
    // Run specific sources
    else if (body.sources && Array.isArray(body.sources)) {
      result = await runNewsScraperAgent(articlesPerSource, body.sources);
    }
    // Run all sources
    else {
      result = await runNewsScraperAgent(articlesPerSource);
    }

    return NextResponse.json({
      success: true,
      message: 'News scraper agent completed',
      data: result
    });
  } catch (error) {
    console.error('POST /api/scraper/run error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to run scraper'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/scraper/run
 * Get scraper status and configuration
 */
export async function GET() {
  try {
    const { NEWS_SOURCES } = await import('@/lib/ingestion/newsSources');
    
    return NextResponse.json({
      success: true,
      data: {
        totalSources: NEWS_SOURCES.length,
        sources: NEWS_SOURCES.map(s => ({
          name: s.name,
          url: s.url,
          language: s.language,
          category: s.category
        })),
        categories: ['local', 'state', 'national'],
        languages: ['english', 'telugu']
      }
    });
  } catch (error) {
    console.error('GET /api/scraper/run error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get scraper info'
      },
      { status: 500 }
    );
  }
}
