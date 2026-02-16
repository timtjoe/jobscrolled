import apiClient from "./client";

const withProxy = (url: string) =>
  `https://api.cors.lol/?url=${encodeURIComponent(url)}`;

// Each function does ONE thing: Fetch raw data from ONE source
export const fetchArbeitNow = () =>
  apiClient.get(withProxy("https://www.arbeitnow.com/api/job-board-api"));

export const fetchRise = () =>
  apiClient.get("https://api.joinrise.io/api/v1/jobs/public?limit=20");

export const fetchJobicy = () =>
  apiClient.get("https://jobicy.com/api/v2/remote-jobs?count=20");

export const fetchRemoteOK = () =>
  apiClient.get("https://remoteok.com/api?api=1");

// HN is a special multi-step fetch
export const fetchHackerNewsJobs = async () => {
  const { data: ids } = await apiClient.get<number[]>(
    "https://hacker-news.firebaseio.com/v0/jobstories.json",
  );
  const limitedIds = ids.slice(0, 15);

  const detailPromises = limitedIds.map((id) =>
    apiClient.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`),
  );
  return Promise.allSettled(detailPromises);
};
