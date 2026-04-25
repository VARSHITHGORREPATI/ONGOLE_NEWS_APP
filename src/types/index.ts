export interface Article {
  id: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  content: string;
  contentEn: string;
  imageUrl: string;
  category: CategoryType;
  timestamp: string;
  author: string;
  readTime: number;
  featured?: boolean;
  trending?: boolean;
}

export type CategoryType = 
  | 'local' 
  | 'state' 
  | 'national' 
  | 'spiritual' 
  | 'business' 
  | 'sports' 
  | 'movies' 
  | 'agriculture';

export interface Category {
  id: CategoryType;
  name: string;
  nameEn: string;
  icon: string;
}

export interface BusinessListing {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  description: string;
  address: string;
  phone: string;
  imageUrl: string;
  offer?: string;
  rating: number;
}

export interface Horoscope {
  id: string;
  sign: string;
  signEn: string;
  signTe: string;
  prediction: string;
  predictionEn: string;
  luckyNumber: number;
  luckyColor: string;
  date: string;
}

export interface VastuTip {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  direction: string;
  imageUrl: string;
}

export interface SpiritualContent {
  id: string;
  title: string;
  titleEn: string;
  type: 'devotional' | 'temple' | 'festival';
  description: string;
  imageUrl: string;
  date: string;
}
