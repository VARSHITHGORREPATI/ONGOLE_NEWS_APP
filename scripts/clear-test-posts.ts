/**
 * Clear Test Posts
 * Run with: npx tsx scripts/clear-test-posts.ts
 */

// Load environment variables
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../.env.local') });

import { supabaseAdmin } from '../src/lib/supabase/client';

async function clearTestPosts() {
  console.log('🗑️  Clearing test posts from database...\n');

  try {
    // Get count before deletion
    const { count: beforeCount } = await supabaseAdmin
      .from('posts')
      .select('*', { count: 'exact', head: true });

    console.log(`📊 Current posts in database: ${beforeCount || 0}`);

    // Ask for confirmation
    console.log('\n⚠️  WARNING: This will delete ALL posts from the database!');
    console.log('   This is useful for testing the scraper with fresh data.\n');

    // Delete all posts
    const { error } = await supabaseAdmin
      .from('posts')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (error) {
      throw error;
    }

    // Get count after deletion
    const { count: afterCount } = await supabaseAdmin
      .from('posts')
      .select('*', { count: 'exact', head: true });

    console.log(`✅ Successfully deleted ${(beforeCount || 0) - (afterCount || 0)} posts`);
    console.log(`📊 Remaining posts: ${afterCount || 0}\n`);

    console.log('🎉 Database cleared! You can now run the scraper to see fresh results.');
    console.log('   Run: npm run scraper:run\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to clear posts:', error);
    process.exit(1);
  }
}

clearTestPosts();
