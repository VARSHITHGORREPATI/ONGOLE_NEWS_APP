-- OngoleConnect Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types
CREATE TYPE post_category AS ENUM (
  'local',
  'state', 
  'national',
  'spiritual',
  'business',
  'sports',
  'movies',
  'agriculture'
);

CREATE TYPE post_priority AS ENUM ('normal', 'breaking');
CREATE TYPE post_language AS ENUM ('telugu', 'english', 'both');
CREATE TYPE social_platform AS ENUM ('facebook', 'instagram', 'twitter');
CREATE TYPE social_status AS ENUM ('pending', 'success', 'failed');

-- ============================================
-- POSTS TABLE (Main news articles)
-- ============================================
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Content (Bilingual)
  title TEXT NOT NULL,
  title_en TEXT NOT NULL,
  summary TEXT NOT NULL,
  summary_en TEXT NOT NULL,
  content TEXT NOT NULL,
  content_en TEXT NOT NULL,
  
  -- Media
  image_url TEXT,
  image_public_id TEXT, -- Cloudinary public ID
  
  -- Source tracking
  source_url TEXT UNIQUE,
  source_name TEXT,
  
  -- Classification
  category post_category NOT NULL DEFAULT 'local',
  tags TEXT[] DEFAULT '{}',
  priority post_priority DEFAULT 'normal',
  language post_language DEFAULT 'both',
  
  -- Metadata
  author TEXT DEFAULT 'OngoleConnect',
  read_time INTEGER DEFAULT 3,
  views INTEGER DEFAULT 0,
  
  -- Features
  featured BOOLEAN DEFAULT false,
  trending BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  
  -- Social media tracking
  is_posted_to_social BOOLEAN DEFAULT false,
  social_posted_at TIMESTAMP WITH TIME ZONE,
  
  -- AI metadata
  ai_generated BOOLEAN DEFAULT false,
  ai_summary_generated BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for performance
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_published ON posts(published) WHERE published = true;
CREATE INDEX idx_posts_featured ON posts(featured) WHERE featured = true;
CREATE INDEX idx_posts_trending ON posts(trending) WHERE trending = true;
CREATE INDEX idx_posts_source_url ON posts(source_url);
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);

-- ============================================
-- SOCIAL LOGS TABLE (Track social media posts)
-- ============================================
CREATE TABLE social_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  platform social_platform NOT NULL,
  status social_status DEFAULT 'pending',
  
  -- Response data
  platform_post_id TEXT,
  error_message TEXT,
  response_data JSONB,
  
  -- Retry tracking
  retry_count INTEGER DEFAULT 0,
  last_retry_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_social_logs_post_id ON social_logs(post_id);
CREATE INDEX idx_social_logs_status ON social_logs(status);
CREATE INDEX idx_social_logs_platform ON social_logs(platform);

-- ============================================
-- BUSINESSES TABLE (Local business listings)
-- ============================================
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic info
  name TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description TEXT,
  description_en TEXT,
  
  -- Contact
  phone TEXT,
  email TEXT,
  address TEXT,
  website TEXT,
  
  -- Media
  image_url TEXT,
  logo_url TEXT,
  
  -- Business details
  category TEXT,
  offer_text TEXT,
  offer_text_en TEXT,
  rating DECIMAL(2,1) DEFAULT 0.0,
  
  -- Status
  verified BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_businesses_category ON businesses(category);
CREATE INDEX idx_businesses_active ON businesses(active) WHERE active = true;

-- ============================================
-- INGESTION QUEUE (News to be processed)
-- ============================================
CREATE TABLE ingestion_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Source data
  source_url TEXT NOT NULL UNIQUE,
  source_name TEXT,
  raw_title TEXT,
  raw_content TEXT,
  raw_image_url TEXT,
  
  -- Processing status
  status TEXT DEFAULT 'pending', -- pending, processing, completed, failed
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  
  -- Result
  post_id UUID REFERENCES posts(id),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_ingestion_queue_status ON ingestion_queue(status);
CREATE INDEX idx_ingestion_queue_source_url ON ingestion_queue(source_url);

-- ============================================
-- ADMIN USERS TABLE (For authentication)
-- ============================================
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'editor', -- admin, editor, viewer
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ANALYTICS TABLE (Track article performance)
-- ============================================
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  
  -- Metrics
  views INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  
  -- Date tracking
  date DATE DEFAULT CURRENT_DATE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(post_id, date)
);

CREATE INDEX idx_analytics_post_id ON analytics(post_id);
CREATE INDEX idx_analytics_date ON analytics(date DESC);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON businesses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment views
CREATE OR REPLACE FUNCTION increment_post_views(post_uuid UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts SET views = views + 1 WHERE id = post_uuid;
  
  INSERT INTO analytics (post_id, views, date)
  VALUES (post_uuid, 1, CURRENT_DATE)
  ON CONFLICT (post_id, date) 
  DO UPDATE SET views = analytics.views + 1;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingestion_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Public read access for published posts
CREATE POLICY "Public can view published posts"
  ON posts FOR SELECT
  USING (published = true);

-- Public read access for active businesses
CREATE POLICY "Public can view active businesses"
  ON businesses FOR SELECT
  USING (active = true);

-- Admin full access (you'll need to set up auth)
CREATE POLICY "Service role has full access to posts"
  ON posts FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to social_logs"
  ON social_logs FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to businesses"
  ON businesses FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to ingestion_queue"
  ON ingestion_queue FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to analytics"
  ON analytics FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- SEED DATA (Sample categories and initial data)
-- ============================================

-- Insert sample admin user (replace with your email)
INSERT INTO admin_users (email, role) VALUES
  ('admin@ongoleconnect.com', 'admin');

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'OngoleConnect database schema created successfully!';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Update admin_users table with your email';
  RAISE NOTICE '2. Set up Supabase Auth';
  RAISE NOTICE '3. Configure storage buckets for images';
END $$;
