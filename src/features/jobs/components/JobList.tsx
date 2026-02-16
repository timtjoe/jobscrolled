import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { withJob } from "@/store/job.store";
import { useJobs } from "@/hooks/useJobs";
import { JobCard } from "./JobCard";
import { TechnicalError } from "@/components/errors";
import { JobSkeleton } from "@/components/Skeleton";
import { MultiSelect } from "@/components/MultiSelect";

const JOB_TYPES = [
  { id: "remote", label: "Remote" },
  { id: "onsite", label: "Onsite" },
  { id: "hybrid", label: "Hybrid" },
];

const Controls: React.FC = () => {
  const [, setFilters] = useAtom(withJob.filters);

const handleApply = (selected: { id: string | number; label: string }[]) => {
  // Cast the string to the specific literal type
  const selectedType = (selected.length ? selected[0].id : "all") as "remote" | "onsite" | "all";
  
  setFilters((prev) => ({ 
    ...prev, 
    type: selectedType, 
    page: 1 
  }));
};

  return (
    <Filter>
      <MultiSelect 
        data={JOB_TYPES} 
        placeholder="Filter by Type" 
        onApply={handleApply} 
      />
    </Filter>
  );
};

const ListContent: React.FC = () => {
  const [filters, setFilters] = useAtom(withJob.filters);
  const { data, isLoading, isError, refetch } = useJobs(filters);
  const loaderRef = useRef<HTMLDivElement>(null);

  const { data: jobList = [], total = 0 } = data || {};
  const hasMore = jobList.length < total;

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target?.isIntersecting && hasMore && !isLoading) {
        setFilters((prev) => ({ ...prev, pageSize: prev.pageSize + 15 }));
      }
    },
    [hasMore, isLoading, setFilters]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { rootMargin: "200px" });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  if (isError) return <TechnicalError onRetry={() => refetch()} />;

  return (
    <>
      <Controls />
      <Meta>{total} Opportunities Found</Meta>
      <List>
        {jobList.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </List>
      <ObserverTarget ref={loaderRef}>
        {isLoading && <JobSkeleton count={2} />}
      </ObserverTarget>
    </>
  );
};

export const JobList: React.FC = () => (
  <Container>
    <ListContent />
  </Container>
);

const Container = styled.div`
  width: 100%;
  background: var(--bg-dark);
`;

const Filter = styled.nav`
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-main);
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const Meta = styled.div`
  padding: 16px 24px;
  font-size: 10px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ObserverTarget = styled.div`
  padding: 20px;
  min-height: 50px;
`;