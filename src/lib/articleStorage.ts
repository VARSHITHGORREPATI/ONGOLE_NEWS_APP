import { Article } from '@/types';
import { articles as initialArticles } from '@/data/mockArticles';

// In-memory storage (in production, this would be a database)
let articlesStore: Article[] = [...initialArticles];

export function getAllArticles(): Article[] {
  return articlesStore.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function getArticleById(id: string): Article | undefined {
  return articlesStore.find(article => article.id === id);
}

export function createArticle(article: Omit<Article, 'id'>): Article {
  const newArticle: Article = {
    ...article,
    id: Date.now().toString(),
  };
  articlesStore.push(newArticle);
  return newArticle;
}

export function updateArticle(id: string, updates: Partial<Article>): Article | null {
  const index = articlesStore.findIndex(article => article.id === id);
  if (index === -1) return null;
  
  articlesStore[index] = { ...articlesStore[index], ...updates };
  return articlesStore[index];
}

export function deleteArticle(id: string): boolean {
  const index = articlesStore.findIndex(article => article.id === id);
  if (index === -1) return false;
  
  articlesStore.splice(index, 1);
  return true;
}

export function getArticlesByCategory(category: string): Article[] {
  return articlesStore.filter(article => article.category === category);
}

export function getFeaturedArticles(): Article[] {
  return articlesStore.filter(article => article.featured);
}

export function getTrendingArticles(): Article[] {
  return articlesStore.filter(article => article.trending);
}

export function getLatestArticles(count: number = 10): Article[] {
  return articlesStore
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, count);
}
