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
    [hasMore, isLoading, setFilters],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "200px",
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  if (isError) return <TechnicalError onRetry={() => refetch()} />;

  return (
    <>
      <List>
        {jobList.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}

        {!isLoading && jobList.length === 0 && (
          <EmptyState>No jobs found matching your criteria.</EmptyState>
        )}
      </List>

      <ObserverTarget ref={loaderRef}>
        {isLoading && <JobSkeleton count={5} />}
      </ObserverTarget>
    </>
  );
};

export const JobList: React.FC = () => {
  const [filters] = useAtom(withJob.filters);
  const { isLoading } = useJobs(filters);

  return (
    <Container $isLoading={isLoading}>
      <ListContent />
    </Container>
  );
};

/* --- STYLES --- */

const Container = styled.div<{ $isLoading?: boolean }>`
  width: 100%;
  background: var(--bg-black);

  ${(p) =>
    p.$isLoading &&
    `
    height: 100vh;
    overflow: hidden;
    pointer-events: none;
  `}
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmptyState = styled.div`
  padding: 40px 24px;
  text-align: center;
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 500;
`;

const ObserverTarget = styled.div`
  padding: 20px;
  min-height: 100px;
`;
