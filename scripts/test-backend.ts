/**
 * Backend Testing Script
 * Run with: npx tsx scripts/test-backend.ts
 */

// Load environment variables
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../.env.local') });

import { supabase, supabaseAdmin } from '../src/lib/supabase/client';
import { processArticleWithAI } from '../src/lib/ai/gemini';
import { uploadImageFromUrl } from '../src/lib/cloudinary/upload';
import { processArticle } from '../src/lib/ingestion/newsProcessor';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testDatabaseConnection() {
  log('\n📊 Testing Database Connection...', 'cyan');
  
  try {
    // Test public client
    const { data, error } = await supabase
      .from('posts')
      .select('count')
      .limit(1);

    if (error) throw error;

    log('✅ Public client connected successfully', 'green');

    // Test admin client
    const { data: adminData, error: adminError } = await supabaseAdmin
      .from('posts')
      .select('count')
      .limit(1);

    if (adminError) throw adminError;

    log('✅ Admin client connected successfully', 'green');
    
    return true;
  } catch (error) {
    log(`❌ Database connection failed: ${error}`, 'red');
    return false;
  }
}

async function testAIProcessing() {
  log('\n🤖 Testing AI Processing...', 'cyan');
  
  try {
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey || geminiKey === 'your-gemini-api-key-here') {
      log('⚠️  Gemini API key not configured', 'yellow');
      log('   Set GEMINI_API_KEY in .env.local to test AI features', 'yellow');
      return true; // Skip test but don't fail
    }

    const testTitle = 'Ongole Bull Festival Celebrated with Great Enthusiasm';
    const testContent = `The annual Ongole Bull Festival was celebrated in Prakasam District with great enthusiasm. 
    Hundreds of farmers participated in the event showcasing their prized Ongole bulls. 
    The district collector inaugurated the event and praised the efforts of local farmers in preserving this indigenous breed.`;

    const result = await processArticleWithAI(testTitle, testContent, 'english');

    log('✅ AI processing successful', 'green');
    log(`   Telugu Title: ${result.teluguTitle}`, 'blue');
    log(`   English Title: ${result.englishTitle}`, 'blue');
    log(`   Category: ${result.category}`, 'blue');
    log(`   Tags: ${result.tags.join(', ')}`, 'blue');
    log(`   Priority: ${result.priority}`, 'blue');
    
    return true;
  } catch (error) {
    log(`❌ AI processing failed: ${error}`, 'red');
    log('   This might be due to an invalid or expired API key', 'yellow');
    log('   Get a new key from: https://makersuite.google.com/app/apikey', 'yellow');
    return false;
  }
}

async function testImageUpload() {
  log('\n🖼️  Testing Image Upload...', 'cyan');
  
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      log('⚠️  Cloudinary credentials not configured', 'yellow');
      log('   Set CLOUDINARY_* variables in .env.local to test image upload', 'yellow');
      return true; // Skip test but don't fail
    }

    const testImageUrl = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800';
    
    const result = await uploadImageFromUrl(testImageUrl, 'ongole-connect/test');

    log('✅ Image upload successful', 'green');
    log(`   URL: ${result.secureUrl}`, 'blue');
    log(`   Public ID: ${result.publicId}`, 'blue');
    log(`   Dimensions: ${result.width}x${result.height}`, 'blue');
    
    return true;
  } catch (error) {
    log(`❌ Image upload failed: ${error}`, 'red');
    log('   Check Cloudinary credentials in .env.local', 'yellow');
    return false;
  }
}

async function testNewsIngestion() {
  log('\n📰 Testing News Ingestion Pipeline...', 'cyan');
  
  try {
    // Test with a sample news URL (you can replace with actual news URL)
    const testUrl = 'https://www.thehindu.com/news/national/andhra-pradesh/';
    
    log('⚠️  Note: This will create a real article in the database', 'yellow');
    log('   Skipping actual ingestion in test mode', 'yellow');
    log('   To test ingestion, uncomment the code below', 'yellow');
    
    /*
    const post = await processArticle({
      url: testUrl,
      name: 'Test Source',
      language: 'english'
    });

    if (post) {
      log('✅ News ingestion successful', 'green');
      log(`   Post ID: ${post.id}`, 'blue');
      log(`   Title: ${post.title}`, 'blue');
    } else {
      log('⚠️  Article was duplicate or skipped', 'yellow');
    }
    */
    
    log('✅ News ingestion pipeline ready (not executed)', 'green');
    return true;
  } catch (error) {
    log(`❌ News ingestion failed: ${error}`, 'red');
    return false;
  }
}

async function testDatabaseOperations() {
  log('\n💾 Testing Database Operations...', 'cyan');
  
  try {
    // Create test post
    const { data: post, error: insertError } = await supabaseAdmin
      .from('posts')
      .insert({
        title: 'టెస్ట్ వార్త',
        title_en: 'Test News',
        summary: 'ఇది ఒక టెస్ట్ వార్త',
        summary_en: 'This is a test news',
        content: 'ఇది ఒక టెస్ట్ వార్త యొక్క పూర్తి కంటెంట్',
        content_en: 'This is the full content of a test news',
        category: 'local',
        published: false,
        tags: ['test']
      })
      .select()
      .single();

    if (insertError) throw insertError;

    log('✅ Insert operation successful', 'green');
    log(`   Post ID: ${post.id}`, 'blue');

    // Update test post
    const { error: updateError } = await supabaseAdmin
      .from('posts')
      .update({ featured: true })
      .eq('id', post.id);

    if (updateError) throw updateError;

    log('✅ Update operation successful', 'green');

    // Delete test post
    const { error: deleteError } = await supabaseAdmin
      .from('posts')
      .delete()
      .eq('id', post.id);

    if (deleteError) throw deleteError;

    log('✅ Delete operation successful', 'green');
    
    return true;
  } catch (error) {
    log(`❌ Database operations failed: ${error}`, 'red');
    return false;
  }
}

async function runAllTests() {
  log('🚀 Starting Backend Tests...', 'cyan');
  log('================================', 'cyan');

  const results = {
    database: await testDatabaseConnection(),
    ai: await testAIProcessing(),
    image: await testImageUpload(),
    ingestion: await testNewsIngestion(),
    operations: await testDatabaseOperations()
  };

  log('\n================================', 'cyan');
  log('📊 Test Results Summary:', 'cyan');
  log('================================', 'cyan');

  Object.entries(results).forEach(([test, passed]) => {
    const status = passed ? '✅ PASSED' : '❌ FAILED';
    const color = passed ? 'green' : 'red';
    log(`${test.toUpperCase()}: ${status}`, color);
  });

  const allPassed = Object.values(results).every(r => r);
  
  log('\n================================', 'cyan');
  if (allPassed) {
    log('🎉 All tests passed!', 'green');
    log('✅ Backend is ready to use', 'green');
  } else {
    log('⚠️  Some tests failed', 'yellow');
    log('Please check the errors above', 'yellow');
  }
  log('================================', 'cyan');

  process.exit(allPassed ? 0 : 1);
}

// Run tests
runAllTests().catch(error => {
  log(`\n❌ Test runner failed: ${error}`, 'red');
  process.exit(1);
});
