import apiClient from "./jobs.client";

// Helper to wrap URLs in a CORS proxy
const withProxy = (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`;

// Job Board Fetchers with Proxy
export const fetchArbeitNow = () => apiClient.get(withProxy("https://arbeitnow.com/api/job-board-api"));
export const fetchRise = () => apiClient.get(withProxy("https://api.joinrise.io/api/v1/jobs/public?limit=20"));
export const fetchJobicy = () => apiClient.get(withProxy("https://jobicy.com/api/v2/remote-jobs?count=20"));
export const fetchRemoteOK = () => apiClient.get(withProxy("https://remoteok.com/api?api=1"));

/**
 * Hacker News Logic
 * Note: Firebase (HN) usually has CORS enabled, 
 * so a proxy might not be needed here, but you can add it if it fails.
 */
export const fetchHackerNewsIds = () => 
  apiClient.get<number[]>("https://hacker-news.firebaseio.com/v0/jobstories.json");

export const fetchHNItem = (id: number) => 
  apiClient.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);

export const fetchHackerNewsJobs = async () => {
  const { data: ids } = await fetchHackerNewsIds();
  const limitedIds = ids.slice(0, 15); // Snappy performance
  
  const detailPromises = limitedIds.map(id => fetchHNItem(id));
  return Promise.allSettled(detailPromises);
};