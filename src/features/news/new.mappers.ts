import type { NewsArticle } from './news.types';

export const adaptJobspikrData = (data: any): NewsArticle[] => {
  return (data.insights || []).map((item: any, index: number) => ({
    id: `jobspikr-${index}`,
    title: item.title || 'No title',
    source: 'JobsPikr',
    description: item.description,
    url: item.url || '#',
    publishedAt: item.timestamp || new Date().toISOString(), // ✅ Works with your mock
    logo: undefined,
    category: 'jobspikr',
  }));
};

export const adaptLinkupData = (data: any): NewsArticle[] => {
  return (data.market_data || []).map((item: any, index: number) => ({
    id: `linkup-${index}`,
    title: item.title || 'No title',
    source: 'LinkUp',
    description: item.summary,
    url: item.url || '#',
    publishedAt: item.date || new Date().toISOString(), // ✅ Works with your mock
    logo: undefined,
    category: 'linkup',
  }));
};

export const adaptCustomData = (data: any): NewsArticle[] => {
  return (data.articles || data || []).map((item: any, index: number) => ({
    id: `custom-${index}`,
    title: item.title || 'No title',
    source: item.source || 'JobNews Daily',
    description: item.description,
    url: item.url || '#',
    publishedAt: item.publishedAt || new Date().toISOString(), // ✅ Works with your mock
    logo: undefined,
    category: 'custom',
  }));
};
