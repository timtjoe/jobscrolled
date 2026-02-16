import { atom, PrimitiveAtom } from "jotai";
import type { JobFilters } from "@/types/jobs";

export interface JobNamespace {
  filters: PrimitiveAtom<JobFilters>;
  selectedId: PrimitiveAtom<string | null>;
}

const initialFilters: JobFilters = {
  search: "",
  sortBy: "date",
  type: "all",
  page: 1,
  pageSize: 15,
  seniority: "all",
  employment: "all",
};

export const withJob: JobNamespace = {
  // Pass the initialFilters here to fix the missing property errors
  filters: atom<JobFilters>(initialFilters),
  selectedId: atom<string | null>(null),
};