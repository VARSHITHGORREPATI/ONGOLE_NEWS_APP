/**
 * Run News Scraper Agent
 * Run with: npx tsx scripts/run-scraper.ts
 */

// Load environment variables
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../.env.local') });

import { runNewsScraperAgent, runScraperByCategory, runScraperByLanguage } from '../src/lib/ingestion/newsScraperAgent';

// Get command line arguments
const args = process.argv.slice(2);
const mode = args[0] || 'all';
const articlesPerSource = parseInt(args[1]) || 3;

async function main() {
  console.log('🤖 AI News Scraper Agent\n');
  console.log(`Mode: ${mode}`);
  console.log(`Articles per source: ${articlesPerSource}\n`);

  try {
    let result;

    switch (mode) {
      case 'local':
        result = await runScraperByCategory('local', articlesPerSource);
        break;
      
      case 'state':
        result = await runScraperByCategory('state', articlesPerSource);
        break;
      
      case 'national':
        result = await runScraperByCategory('national', articlesPerSource);
        break;
      
      case 'telugu':
        result = await runScraperByLanguage('telugu', articlesPerSource);
        break;
      
      case 'english':
        result = await runScraperByLanguage('english', articlesPerSource);
        break;
      
      case 'all':
      default:
        result = await runNewsScraperAgent(articlesPerSource);
        break;
    }

    console.log('\n✅ Scraper completed successfully!');
    console.log(`\n📊 Final Results:`);
    console.log(`   Articles found: ${result.totalArticlesFound}`);
    console.log(`   Successfully posted: ${result.totalArticlesProcessed}`);
    console.log(`   Duplicates skipped: ${result.totalDuplicates}`);
    console.log(`   Errors: ${result.totalErrors}`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Scraper failed:', error);
    process.exit(1);
  }
}

// Show usage if help is requested
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
🤖 AI News Scraper Agent

Usage:
  npx tsx scripts/run-scraper.ts [mode] [articlesPerSource]

Modes:
  all       - Scrape all sources (default)
  local     - Scrape only local news
  state     - Scrape only state news
  national  - Scrape only national news
  telugu    - Scrape only Telugu sources
  english   - Scrape only English sources

Examples:
  npx tsx scripts/run-scraper.ts all 5
  npx tsx scripts/run-scraper.ts local 3
  npx tsx scripts/run-scraper.ts telugu 5
  `);
  process.exit(0);
}

main();
