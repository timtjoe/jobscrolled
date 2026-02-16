import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { withJob } from "@/store/job.store";
import { useJobs } from "@/hooks/useJobs";
import { JobCard } from "./JobCard";
import { TechnicalError } from "@/components/errors";
import { JobSkeleton } from "@/components/Skeleton";

const ListContent: React.FC = () => {
  const [filters, setFilters] = useAtom(withJob.filters);
  const { data, isLoading, isError, refetch, isFetching } = useJobs(filters);
  const loaderRef = useRef<HTMLDivElement>(null);

  const jobList = data?.data || [];
  const total = data?.total || 0;
  const hasMore = jobList.length < total;

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      // We check isFetching to prevent firing 5 requests at once
      if (target?.isIntersecting && hasMore && !isFetching) {
        setFilters((prev) => ({ ...prev, pageSize: prev.pageSize + 15 }));
      }
    },
    [hasMore, isFetching, setFilters],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "600px", // High margin so it loads before user sees the end
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  if (isError) return <TechnicalError onRetry={() => refetch()} />;

  // Initial Load State (Only when absolutely no data exists)
  if (isLoading && jobList.length === 0) {
    return <JobSkeleton count={4} />;
  }

  return (
    <>
      <List>
        {jobList.map((job: any) => (
          <JobCard key={job.id} job={job} />
        ))}
        
        {!isLoading && jobList.length === 0 && (
          <EmptyState>No jobs found matching your criteria.</EmptyState>
        )}
      </List>

      {/* This ref is always at the bottom */}
      <ObserverTarget ref={loaderRef}>
        {isFetching && jobList.length > 0 && (
          <div style={{ padding: '20px' }}>
             <JobSkeleton count={2} />
          </div>
        )}
      </ObserverTarget>
    </>
  );
};

export const JobList: React.FC = () => (
  <Container>
    <ListContent />
  </Container>
);

/* --- STYLES --- */

const Container = styled.div`
  width: 100%;
  background: var(--bg-black);
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100vw; 
`;
const EmptyState = styled.div`
  padding: 40px 24px;
  text-align: center;
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 500;
`;

const ObserverTarget = styled.div`
  min-height: 100px;
  width: 100%;
`;