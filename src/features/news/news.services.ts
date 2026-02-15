import type { NewsArticle, NewsFilters, NewsResponse } from './news.types';
import { newsApiClient } from './news.api';
import { adaptJobspikrData, adaptLinkupData, adaptCustomData } from './new.mappers'; 

export class NewsService {
  async getNews(filters: NewsFilters = {}): Promise<NewsResponse> {
    const allData = await newsApiClient.getAllNews({ limit: filters.limit || 20 });

    const articles: NewsArticle[] = [
      ...adaptJobspikrData(allData.jobspikr),
      ...adaptLinkupData(allData.linkup),
      ...adaptCustomData(allData.custom),
    ].slice(0, filters.limit || 12)
     .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return {
      articles,
      total: articles.length,
      hasMore: articles.length >= (filters.limit || 12),
    };
  }
}

export const newsService = new NewsService();
