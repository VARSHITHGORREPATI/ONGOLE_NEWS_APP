import { createClient } from '@supabase/supabase-js';

// Lazy initialization to allow environment variables to be loaded first
let _supabase: ReturnType<typeof createClient> | null = null;
let _supabaseAdmin: ReturnType<typeof createClient> | null = null;

function getSupabaseUrl(): string {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error('SUPABASE_URL is not set in environment variables');
  }
  return url;
}

function getSupabaseAnonKey(): string {
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) {
    throw new Error('SUPABASE_ANON_KEY is not set in environment variables');
  }
  return key;
}

function getSupabaseServiceKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set in environment variables');
  }
  return key;
}

// Client for frontend (uses anon key with RLS)
export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(target, prop) {
    if (!_supabase) {
      _supabase = createClient(getSupabaseUrl(), getSupabaseAnonKey());
    }
    return (_supabase as any)[prop];
  }
});

// Admin client for backend operations (bypasses RLS)
export const supabaseAdmin = new Proxy({} as ReturnType<typeof createClient>, {
  get(target, prop) {
    if (!_supabaseAdmin) {
      _supabaseAdmin = createClient(getSupabaseUrl(), getSupabaseServiceKey(), {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      });
    }
    return (_supabaseAdmin as any)[prop];
  }
});

// Database types
export interface Post {
  id: string;
  title: string;
  title_en: string;
  summary: string;
  summary_en: string;
  content: string;
  content_en: string;
  image_url: string | null;
  image_public_id: string | null;
  source_url: string | null;
  source_name: string | null;
  category: 'local' | 'state' | 'national' | 'spiritual' | 'business' | 'sports' | 'movies' | 'agriculture';
  tags: string[];
  priority: 'normal' | 'breaking';
  language: 'telugu' | 'english' | 'both';
  author: string;
  read_time: number;
  views: number;
  featured: boolean;
  trending: boolean;
  published: boolean;
  is_posted_to_social: boolean;
  social_posted_at: string | null;
  ai_generated: boolean;
  ai_summary_generated: boolean;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface SocialLog {
  id: string;
  post_id: string;
  platform: 'facebook' | 'instagram' | 'twitter';
  status: 'pending' | 'success' | 'failed';
  platform_post_id: string | null;
  error_message: string | null;
  response_data: any;
  retry_count: number;
  last_retry_at: string | null;
  created_at: string;
}

export interface Business {
  id: string;
  name: string;
  name_en: string;
  description: string | null;
  description_en: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  website: string | null;
  image_url: string | null;
  logo_url: string | null;
  category: string | null;
  offer_text: string | null;
  offer_text_en: string | null;
  rating: number;
  verified: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface IngestionQueueItem {
  id: string;
  source_url: string;
  source_name: string | null;
  raw_title: string | null;
  raw_content: string | null;
  raw_image_url: string | null;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error_message: string | null;
  retry_count: number;
  post_id: string | null;
  created_at: string;
  processed_at: string | null;
}
