import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import {
  fetchArbeitNow,
  fetchRise,
  fetchJobicy,
  fetchRemoteOK,
  fetchHackerNewsJobs,
} from "./api/jobs.service";
import { Mappers } from "./job.mappers";
import {
  jobKeys,
  type BaseJob,
  type JobContract,
  type JobFilters,
} from "./job.types";

const DEFAULT_FILTERS: JobFilters = {
  search: "",
  type: "all",
  sortBy: "date",
  page: 1,
  pageSize: 10,
};

export function useJobs<T extends BaseJob = JobContract>(
  filters: JobFilters = DEFAULT_FILTERS, 
): UseQueryResult<{ data: T[]; total: number }, Error> {
  return useQuery<JobContract[], Error, { data: T[]; total: number }>({
    queryKey: [...jobKeys.list(), filters.search, filters.type, filters.source],
    queryFn: async (): Promise<JobContract[]> => {
      const results = await Promise.allSettled([
        fetchArbeitNow(),
        fetchRise(),
        fetchJobicy(),
        fetchRemoteOK(),
        fetchHackerNewsJobs(),
      ]);

      const [arbeit, rise, jobicy, remoteOk, hnResults] = results;
      const combinedData: JobContract[] = [];

      // Logic Note: Proxies like corsproxy.io return the exact JSON.
      // We check for .data (Axios wrapper) and then the API specific path.

      if (arbeit.status === "fulfilled" && arbeit.value.data?.data) {
        combinedData.push(...arbeit.value.data.data.map(Mappers.mapArbeitNow));
      }

      if (rise.status === "fulfilled" && rise.value.data?.result?.jobs) {
        combinedData.push(...rise.value.data.result.jobs.map(Mappers.mapRise));
      }

      if (jobicy.status === "fulfilled" && jobicy.value.data?.jobs) {
        combinedData.push(...jobicy.value.data.jobs.map(Mappers.mapJobicy));
      }

      if (remoteOk.status === "fulfilled" && Array.isArray(remoteOk.value.data)) {
        // RemoteOK returns an array where the first item is often legal info, not a job
        const jobsOnly = remoteOk.value.data.filter((i: any) => i.id);
        combinedData.push(...jobsOnly.map(Mappers.mapRemoteOK));
      }

      if (hnResults.status === "fulfilled") {
        hnResults.value.forEach((res) => {
          if (res.status === "fulfilled" && res.value.data) {
            combinedData.push(Mappers.mapHackerNews(res.value.data));
          }
        });
      }

      return combinedData;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    select: (data) => {
      let processed = [...data];

      // 1. Filter by Source (Matches the HN Sidebar requirements)
      if (filters.source) {
        processed = processed.filter((j) => j.source === filters.source);
      }

      // 2. Filter by Type
      if (filters.type !== "all") {
        processed = processed.filter((j) =>
          filters.type === "remote" ? j.isRemote : !j.isRemote
        );
      }

      // 3. Filter by Search
      if (filters.search) {
        const q = filters.search.toLowerCase();
        processed = processed.filter(
          (j) => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q)
        );
      }

      // 4. Sort by Date (Descending)
      processed.sort((a, b) => 
        new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
      );

      const total = processed.length;

      // 5. Infinite Scroll Logic: 
      // Since we increment filters.pageSize in the Observer, 
      // we always slice from 0 to the current pageSize.
      const sliced = processed.slice(0, filters.pageSize);

      return {
        data: sliced as unknown as T[],
        total,
      };
    }
  });
}