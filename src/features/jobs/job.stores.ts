// features/jobs/store/jobFilters.atom.ts
import { atom } from "jotai";
import type { JobFilters } from "./job.types";

export const jobFiltersAtom = atom<JobFilters>({
  search: "",
  type: "all",
  sortBy: "date",
  page: 1,
  pageSize: 15,
});
