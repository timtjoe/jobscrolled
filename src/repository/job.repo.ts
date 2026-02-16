import { Mappers } from "@/features/jobs/mappers";
import {
  fetchArbeitNow,
  fetchRise,
  fetchJobicy,
  fetchRemoteOK,
  fetchHackerNewsJobs,
} from "@/features/jobs/services";
import type { JobContract } from "@/types/jobs";

export const JobRepository = {
  /**
   * Fetches and combines all jobs from multiple aggregators
   */
  async getAll(): Promise<JobContract[]> {
    const results = await Promise.allSettled([
      fetchArbeitNow(),
      fetchRise(),
      fetchJobicy(),
      fetchRemoteOK(),
      fetchHackerNewsJobs(),
    ]);

    const [arbeit, rise, jobicy, remoteOk, hnResults] = results;
    const combined: JobContract[] = [];

    if (arbeit.status === "fulfilled" && arbeit.value.data?.data)
      combined.push(...arbeit.value.data.data.map(Mappers.mapArbeitNow));

    if (rise.status === "fulfilled" && rise.value.data?.result?.jobs)
      combined.push(...rise.value.data.result.jobs.map(Mappers.mapRise));

    if (jobicy.status === "fulfilled" && jobicy.value.data?.jobs)
      combined.push(...jobicy.value.data.jobs.map(Mappers.mapJobicy));

    if (remoteOk.status === "fulfilled" && Array.isArray(remoteOk.value.data)) {
      const jobsOnly = remoteOk.value.data.filter((i: any) => i.id);
      combined.push(...jobsOnly.map(Mappers.mapRemoteOK));
    }

    if (hnResults.status === "fulfilled") {
      hnResults.value.forEach((res) => {
        if (res.status === "fulfilled" && res.value.data)
          combined.push(Mappers.mapHackerNews(res.value.data));
      });
    }

    return combined;
  },

  /**
   * Find a single job by ID from the cache or a specific source
   */
  async findOne(
    id: string,
    currentList: JobContract[] = [],
  ): Promise<JobContract | undefined> {
    return currentList.find((j) => j.id === id);
  },
};
