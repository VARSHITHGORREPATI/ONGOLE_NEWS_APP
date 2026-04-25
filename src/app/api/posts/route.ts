import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase/client';

/**
 * GET /api/posts
 * Fetch all posts with filters
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const trending = searchParams.get('trending');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    // Apply filters
    if (category) {
      query = query.eq('category', category);
    }
    if (featured === 'true') {
      query = query.eq('featured', true);
    }
    if (trending === 'true') {
      query = query.eq('trending', true);
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        limit,
        offset,
        total: count || 0
      }
    });
  } catch (error) {
    console.error('GET /api/posts error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch posts'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/posts
 * Create new post (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'title_en', 'content', 'content_en', 'category'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Insert post
    const { data, error } = await supabaseAdmin
      .from('posts')
      .insert({
        title: body.title,
        title_en: body.title_en,
        summary: body.summary || body.title,
        summary_en: body.summary_en || body.title_en,
        content: body.content,
        content_en: body.content_en,
        image_url: body.image_url || null,
        image_public_id: body.image_public_id || null,
        source_url: body.source_url || null,
        source_name: body.source_name || 'OngoleConnect',
        category: body.category,
        tags: body.tags || [],
        priority: body.priority || 'normal',
        language: body.language || 'both',
        author: body.author || 'OngoleConnect',
        read_time: body.read_time || 3,
        featured: body.featured || false,
        trending: body.trending || false,
        published: body.published !== false,
        published_at: body.published !== false ? new Date().toISOString() : null
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data
    }, { status: 201 });
  } catch (error) {
    console.error('POST /api/posts error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create post'
      },
      { status: 500 }
    );
  }
}
