import apiClient from "./jobs.client";

// Helper remains defined but is not wrapping the calls yet
// const withProxy = (url: string) =>
//   `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

const withProxy = (url: string) =>
  `https://api.cors.lol/?url=${encodeURIComponent(url)}`;

// Use the proxy specifically for ArbeitNow
export const fetchArbeitNow = () => 
  apiClient.get(withProxy("https://www.arbeitnow.com/api/job-board-api"));

export const fetchRise = () =>
  apiClient.get("https://api.joinrise.io/api/v1/jobs/public?limit=20");

export const fetchJobicy = () =>
  apiClient.get("https://jobicy.com/api/v2/remote-jobs?count=20");

export const fetchRemoteOK = () =>
  apiClient.get("https://remoteok.com/api?api=1");

export const fetchHackerNewsIds = () =>
  apiClient.get<number[]>(
    "https://hacker-news.firebaseio.com/v0/jobstories.json",
  );

export const fetchHNItem = (id: number) =>
  apiClient.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);

export const fetchHackerNewsJobs = async () => {
  const { data: ids } = await fetchHackerNewsIds();
  const limitedIds = ids.slice(0, 15); // Snappy performance

  const detailPromises = limitedIds.map((id) => fetchHNItem(id));
  return Promise.allSettled(detailPromises);
};
