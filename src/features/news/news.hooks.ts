import { useQuery } from "@tanstack/react-query";
import type { NewsFilters, NewsResponse } from './news.types';
import { newsService } from './news.services';

const newsKeys = {
  all: () => ['news'] as const,
  list: () => [...newsKeys.all(), 'list'] as const,
};

export const useNews = (filters: NewsFilters = {}): any => {
  return useQuery({
    queryKey: [...newsKeys.list(), filters], // ✅ Stable key
    queryFn: async (): Promise<NewsResponse> => {
      const result = await newsService.getNews(filters);
      return result;
    },
    staleTime: 1000 * 60 * 5, // ✅ 5 min cache (like useJobs)
    select: (data: NewsResponse) => {
      // ✅ Post-process (like useJobs filtering/sorting)
      return {
        ...data,
        articles: data.articles.sort((a, b) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )
      };
    },
  });
};
