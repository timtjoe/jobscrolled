import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { withJob } from "@/store/job.store";
import { useJobs } from "@/hooks/useJobs";
import { JobCard } from "./JobCard";
import { TechnicalError } from "@/components/errors";
import { JobSkeleton } from "@/components/Skeleton";

/**
 * Controls: Minimalist Text Chips
 */
const Controls: React.FC = () => {
  const [filters, setFilters] = useAtom(withJob.filters);

  const handleType = (type: typeof filters.type) =>
    setFilters((prev) => ({ ...prev, type, page: 1 }));

  return (
    <Filter>
      {(["all", "remote", "onsite"] as const).map((t) => (
        <Text
          key={t}
          $active={filters.type === t}
          onClick={() => handleType(t)}
        >
          {t}
        </Text>
      ))}
    </Filter>
  );
};

const ListContent: React.FC = () => {
  const [filters, setFilters] = useAtom(withJob.filters);
  const { data, isLoading, isError, refetch } = useJobs(filters);
  const loaderRef = useRef<HTMLDivElement>(null);

  const { data: jobList = [], total = 0 } = data || {};
  const hasMore = jobList.length < total;

  // Infinite Scroll Logic
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target?.isIntersecting && hasMore && !isLoading) {
        setFilters((prev) => ({
          ...prev,
          pageSize: prev.pageSize + 15,
        }));
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

/* --- STYLES: Minimal Media Object Mode --- */

const Container = styled.div`
  width: 100%;
`;

const Filter = styled.nav`
  display: flex;
  gap: 20px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border);
`;

const Text = styled.span<{ $active: boolean }>`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  color: ${(p) => (p.$active ? "var(--primary)" : "var(--muted)")};
  border-bottom: 2px solid
    ${(p) => (p.$active ? "var(--primary)" : "transparent")};
  padding-bottom: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: var(--black);
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const Meta = styled.div`
  padding: 16px 24px;
  font-size: 10px;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ObserverTarget = styled.div`
  padding: 40px;
  min-height: 100px;
`;
