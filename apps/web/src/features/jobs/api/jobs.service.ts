import apiClient from "./jobs.client"; // The one with your custom headers

// Separate functions for each API to keep it clean
export const fetchArbeitNow = () => apiClient.get("https://arbeitnow.com/api/job-board-api");
export const fetchRise = () => apiClient.get("https://api.joinrise.io/api/v1/jobs/public?limit=20");
export const fetchJobicy = () => apiClient.get("https://jobicy.com/api/v2/remote-jobs?count=20");
export const fetchRemoteOK = () => apiClient.get("https://remoteok.com/api?api=1");

// features/jobs/api/jobs.service.ts

// Existing fetchers...
export const fetchHackerNewsIds = () => 
  apiClient.get<number[]>("https://hacker-news.firebaseio.com/v0/jobstories.json");

export const fetchHNItem = (id: number) => 
  apiClient.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);

/**
 * Orchestrates the Hacker News multi-step fetch
 */
export const fetchHackerNewsJobs = async () => {
  const { data: ids } = await fetchHackerNewsIds();
  // Take the first 15-20 to keep performance snappy
  const limitedIds = ids.slice(0, 20);
  
  const detailPromises = limitedIds.map(id => fetchHNItem(id));
  return Promise.allSettled(detailPromises);
};