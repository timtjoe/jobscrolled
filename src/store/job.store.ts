import { atom, PrimitiveAtom } from "jotai";
import type { JobFilters } from "@/types/jobs";

export interface JobNamespace {
  filters: PrimitiveAtom<JobFilters>;
  selectedId: PrimitiveAtom<string | null>;
}

export const withJob: JobNamespace = {
  filters: atom<JobFilters>({
    search: "",
    type: "all",
    sortBy: "date",
    page: 1,
    pageSize: 15,
  }),
  selectedId: atom<string | null>(null),
};
