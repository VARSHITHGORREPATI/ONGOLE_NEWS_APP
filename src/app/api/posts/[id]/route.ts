import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase/client';

/**
 * GET /api/posts/:id
 * Fetch single post and increment views
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Fetch post
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .eq('published', true)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Increment views (async, don't wait)
    supabaseAdmin.rpc('increment_post_views', { post_uuid: id }).catch(console.error);

    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('GET /api/posts/:id error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch post'
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/posts/:id
 * Update post (admin only)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Remove fields that shouldn't be updated directly
    const { id: _, created_at, ...updateData } = body;

    const { data, error } = await supabaseAdmin
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('PUT /api/posts/:id error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update post'
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/posts/:id
 * Delete post (admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Get post to delete image from Cloudinary
    const { data: post } = await supabaseAdmin
      .from('posts')
      .select('image_public_id')
      .eq('id', id)
      .single();

    // Delete from database
    const { error } = await supabaseAdmin
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    // Delete image from Cloudinary (async, don't wait)
    if (post?.image_public_id) {
      const { deleteImage } = await import('@/lib/cloudinary/upload');
      deleteImage(post.image_public_id).catch(console.error);
    }

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('DELETE /api/posts/:id error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete post'
      },
      { status: 500 }
    );
  }
}
