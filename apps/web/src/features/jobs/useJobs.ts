import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import {
  fetchArbeitNow,
  fetchRise,
  fetchJobicy,
  fetchRemoteOK,
  fetchHackerNewsJobs,
} from "./api/jobs.service";
import { Mappers } from "./jobs.mapper";
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
  // Fallback to DEFAULT_FILTERS enables backward compatibility/empty calls
  filters: JobFilters = DEFAULT_FILTERS, 
): UseQueryResult<{ data: T[]; total: number }, Error> {
  return useQuery<JobContract[], Error, { data: T[]; total: number }>({
    // Include filters.source in the key to ensure cache isolation for specific feeds
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

      if (arbeit.status === "fulfilled")
        combinedData.push(...arbeit.value.data.data.map(Mappers.mapArbeitNow));

      if (rise.status === "fulfilled")
        combinedData.push(...rise.value.data.result.jobs.map(Mappers.mapRise));

      if (jobicy.status === "fulfilled")
        combinedData.push(...jobicy.value.data.jobs.map(Mappers.mapJobicy));

      if (remoteOk.status === "fulfilled") {
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
    staleTime: 1000 * 60 * 5,
// features/jobs/useJobs.ts

select: (data) => {
  let processed = [...data];

  // 1. FILTER BY SOURCE FIRST (Crucial for the HN Sidebar)
  // If the user wants only "Hacker News", we discard everything else immediately
  if (filters.source) {
    processed = processed.filter((j) => j.source === filters.source);
  }

  // 2. FILTER BY TYPE (Remote/Onsite)
  if (filters.type !== "all") {
    processed = processed.filter((j) =>
      filters.type === "remote" ? j.isRemote : !j.isRemote
    );
  }

  // 3. FILTER BY SEARCH
  if (filters.search) {
    const q = filters.search.toLowerCase();
    processed = processed.filter(
      (j) => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q)
    );
  }

  // 4. SORT BY DATE (Do this before slicing)
  processed.sort((a, b) => 
    new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  );

  // 5. CALCULATE TOTAL & SLICE
  const total = processed.length;
  
  // Now, if processed only contains HN jobs, 
  // slice(0, 5) will actually return the top 5 HN jobs.
  const start = (filters.page - 1) * filters.pageSize;
  const end = start + filters.pageSize;
  const sliced = processed.slice(start, end);

  return {
    data: sliced as unknown as T[],
    total,
  };
}
  });
}
