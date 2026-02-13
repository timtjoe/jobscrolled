import { useQuery } from "@tanstack/react-query";
import {
  fetchArbeitNow,
  fetchRise,
  fetchJobicy,
  fetchRemoteOK,
} from "./api/jobs.service";
import { Mappers } from "./jobs.mapper";
import { jobKeys, type JobContract, type JobFilters } from "./job.types";

// Added optional filters parameter with a default value for backward compatibility
export const useJobs = (filters: JobFilters = {}) => {
  return useQuery({
    queryKey: jobKeys.list(),
    queryFn: async (): Promise<JobContract[]> => {
      const results = await Promise.allSettled([
        fetchArbeitNow(),
        fetchRise(),
        fetchJobicy(),
        fetchRemoteOK(),
      ]);

      const [arbeit, rise, jobicy, remoteOk] = results;
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

      return combinedData;
    },
    staleTime: 1000 * 60 * 5,
    // The 'select' transform is the best practice for filtering/sorting cached data
    select: (data) => {
      let filtered = [...data];

      // 1. Handle Search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        filtered = filtered.filter(
          (job) =>
            job.title.toLowerCase().includes(query) ||
            job.company.toLowerCase().includes(query),
        );
      }

      // 2. Handle Sorting (Newest First by default)
      filtered.sort((a, b) => {
        if (filters.sortBy === "title") {
          return a.title.localeCompare(b.title);
        }
        // Default: Sort by date descending
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      });

      return filtered;
    },
  });
};
