/**
 * Sample News Ingestion Script
 * Run with: npx tsx scripts/ingest-sample-news.ts
 */

// Load environment variables
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../.env.local') });

import { processArticle, addToIngestionQueue } from '../src/lib/ingestion/newsProcessor';

// Sample news URLs (replace with actual Telugu/local news URLs)
const sampleSources = [
  {
    url: 'https://www.thehindu.com/news/national/andhra-pradesh/',
    name: 'The Hindu - AP',
    language: 'english' as const
  },
  {
    url: 'https://www.eenadu.net/telugu-news/andhra-pradesh/prakasam/',
    name: 'Eenadu - Prakasam',
    language: 'telugu' as const
  },
  // Add more sources here
];

async function ingestSampleNews() {
  console.log('🚀 Starting sample news ingestion...\n');

  for (const source of sampleSources) {
    try {
      console.log(`📰 Processing: ${source.name}`);
      console.log(`   URL: ${source.url}`);

      const post = await processArticle(source);

      if (post) {
        console.log(`✅ Success! Post ID: ${post.id}`);
        console.log(`   Title: ${post.title}`);
        console.log(`   Category: ${post.category}\n`);
      } else {
        console.log(`⚠️  Skipped (duplicate or insufficient content)\n`);
      }
    } catch (error) {
      console.error(`❌ Failed: ${error}\n`);
    }

    // Add delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('✅ Sample news ingestion completed!');
}

// Run ingestion
ingestSampleNews().catch(error => {
  console.error('❌ Ingestion failed:', error);
  process.exit(1);
});
