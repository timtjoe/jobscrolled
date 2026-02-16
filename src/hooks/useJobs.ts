import { useQuery } from "@tanstack/react-query";
import { JobRepository } from "@/repository/job.repo";
import type { JobFilters } from "@/types/jobs";

export const jobKeys = {
  all: ["jobs"] as const,
  list: (filters: JobFilters) => [...jobKeys.all, "list", filters] as const,
};

export function useJobs(filters: JobFilters) {
  return useQuery({
    queryKey: jobKeys.list(filters),
    queryFn: () => JobRepository.getAll(),
    staleTime: 1000 * 60 * 5,
    select: (data) => {
      let processed = [...data];

      // Filtering logic
      if (filters.source)
        processed = processed.filter((j) => j.source === filters.source);
      if (filters.type !== "all") {
        processed = processed.filter((j) =>
          filters.type === "remote" ? j.isRemote : !j.isRemote,
        );
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        processed = processed.filter(
          (j) =>
            j.title.toLowerCase().includes(q) ||
            j.company.toLowerCase().includes(q),
        );
      }

      // Remote-first Sorting
      processed.sort((a, b) => {
        if (a.isRemote !== b.isRemote) return b.isRemote ? 1 : -1;
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      });

      return {
        data: processed.slice(0, filters.pageSize),
        total: processed.length,
      };
    },
  });
}
