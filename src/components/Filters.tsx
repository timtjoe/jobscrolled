import React from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { withJob } from "@/store/job.store";
import { Select } from "@/components/Select";

const SENIORITY_LEVELS = [
  { id: "all", label: "All Experience" },
  { id: "junior", label: "Junior" },
  { id: "mid", label: "Mid Level" },
  { id: "senior", label: "Senior / Lead" },
];

// const EMPLOYMENT_TYPES = [
//   { id: "all", label: "All Types" },
//   { id: "full-time", label: "Full-time" },
//   { id: "contract", label: "Contract" },
//   { id: "internship", label: "Internship" },
// ];

const LOCATION_TYPES = [
  { id: "all", label: "All Locations" },
  { id: "remote", label: "Remote" },
  { id: "onsite", label: "On-site" },
  { id: "hybrid", label: "Hybrid" },
];

export const Filters: React.FC = () => {
  const [filters, setFilters] = useAtom(withJob.filters);

  const updateFilter = (key: keyof typeof filters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || "all",
      page: 1,
    }));
  };

  return (
    <FilterStack>
      <Select
        data={LOCATION_TYPES}
        placeholder="Select Mode"
        selected={LOCATION_TYPES.find((t) => t.id === filters.type) || null}
        onSelect={(val) => updateFilter("type", val?.id)}
      />

      <Select
        data={SENIORITY_LEVELS}
        placeholder="Experience Level"
        selected={
          SENIORITY_LEVELS.find((t) => t.id === filters.seniority) || null
        }
        onSelect={(val) => updateFilter("seniority", val?.id)}
      />
    </FilterStack>
  );
};

const FilterStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
`;
