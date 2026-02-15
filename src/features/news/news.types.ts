export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  description?: string;
  url: string;
  publishedAt: string;
  logo?: string;
  category: 'jobspikr' | 'linkup' | 'custom';
}

export interface NewsFilters {
  category?: string;
  limit?: number;
}

export interface NewsResponse {
  articles: NewsArticle[];
  total: number;
  hasMore: boolean;
}
