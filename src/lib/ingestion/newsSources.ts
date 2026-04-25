/**
 * News Sources Configuration
 * Define all news sources to fetch from
 */

export interface NewsSource {
  name: string;
  url: string;
  language: 'english' | 'telugu';
  category?: string;
  selectors?: {
    articleLinks?: string;
    title?: string;
    content?: string;
    image?: string;
  };
}

export const NEWS_SOURCES: NewsSource[] = [
  // Zee News - English
  {
    name: 'Zee News',
    url: 'https://zeenews.india.com/india',
    language: 'english',
    category: 'national',
    selectors: {
      articleLinks: 'article h2 a, .article-list a, .story-card a',
      title: 'h1.article-heading, h1',
      content: '.article-content, .article-description',
      image: 'meta[property="og:image"]'
    }
  },
  {
    name: 'Zee News - Andhra Pradesh',
    url: 'https://zeenews.india.com/andhra-pradesh',
    language: 'english',
    category: 'state',
    selectors: {
      articleLinks: 'article h2 a, .article-list a, .story-card a',
      title: 'h1.article-heading, h1',
      content: '.article-content, .article-description',
      image: 'meta[property="og:image"]'
    }
  },

  // Eenadu - Telugu (Updated URLs)
  {
    name: 'Eenadu',
    url: 'https://www.eenadu.net/',
    language: 'telugu',
    category: 'state',
    selectors: {
      articleLinks: 'a[href*="/article/"]',
      title: 'h1, .news-title',
      content: '.news-content, .article-content, .story-content',
      image: 'meta[property="og:image"]'
    }
  },
  {
    name: 'Eenadu - Prakasam',
    url: 'https://www.eenadu.net/',
    language: 'telugu',
    category: 'local',
    selectors: {
      articleLinks: 'a[href*="/prakasam/"], a[href*="/ongole/"]',
      title: 'h1, .news-title',
      content: '.news-content, .article-content, .story-content',
      image: 'meta[property="og:image"]'
    }
  },

  // Andhra Jyothy - Telugu (Fixed URLs)
  {
    name: 'Andhra Jyothy',
    url: 'https://www.andhrajyothy.com/andhra-pradesh',
    language: 'telugu',
    category: 'state',
    selectors: {
      articleLinks: 'a[href*="/andhra-pradesh/"]',
      title: 'h1.story-title, h1',
      content: '.story-content, .article-body, .news-content',
      image: 'meta[property="og:image"]'
    }
  },
  {
    name: 'Andhra Jyothy - National',
    url: 'https://www.andhrajyothy.com/national',
    language: 'telugu',
    category: 'national',
    selectors: {
      articleLinks: 'a[href*="/national/"]',
      title: 'h1.story-title, h1',
      content: '.story-content, .article-body, .news-content',
      image: 'meta[property="og:image"]'
    }
  },

  // Sakshi - Telugu
  {
    name: 'Sakshi',
    url: 'https://www.sakshi.com/state/andhra-pradesh',
    language: 'telugu',
    category: 'state',
    selectors: {
      articleLinks: 'a[href*="/news/"]',
      title: 'h1.news-title, h1',
      content: '.news-description, .story-content, .article-content',
      image: 'meta[property="og:image"]'
    }
  },
  {
    name: 'Sakshi - Prakasam',
    url: 'https://www.sakshi.com/state/andhra-pradesh',
    language: 'telugu',
    category: 'local',
    selectors: {
      articleLinks: 'a[href*="/prakasam/"], a[href*="/ongole/"]',
      title: 'h1.news-title, h1',
      content: '.news-description, .story-content, .article-content',
      image: 'meta[property="og:image"]'
    }
  }
];

/**
 * Get news sources by category
 */
export function getSourcesByCategory(category: string): NewsSource[] {
  return NEWS_SOURCES.filter(source => source.category === category);
}

/**
 * Get news sources by language
 */
export function getSourcesByLanguage(language: 'english' | 'telugu'): NewsSource[] {
  return NEWS_SOURCES.filter(source => source.language === language);
}

/**
 * Get all news sources
 */
export function getAllSources(): NewsSource[] {
  return NEWS_SOURCES;
}
