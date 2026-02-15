import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { jobFiltersAtom } from "../job.stores";
import { useJobs } from "../job.hooks";
import { JobCard } from "./JobCard";
import { ErrorBoundary, TechnicalError } from "@/components/errors";
import { JobSkeleton } from "@/components/Skeleton";
import { Toaster, toast } from "sonner";
import type { JobContract } from "../job.types";
import JobDetailModal from "./JobModal";

const ListContent: React.FC = () => {
  const [filters, setFilters] = useAtom(jobFiltersAtom);
  const { data, isLoading, isError, refetch } = useJobs(filters);
  const loaderRef = useRef<HTMLDivElement>(null);

  const { data: jobList = [], total = 0 } = data || {};
  const hasMore = jobList.length < total;

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target?.isIntersecting && hasMore && !isLoading) {
        setFilters((prev) => ({ 
          ...prev, 
          pageSize: prev.pageSize + 15 
        }));
      }
    },
    [hasMore, isLoading, setFilters]
  );

  const openJobModal = useCallback((job: JobContract) => {
    toast.custom(
      () => <JobDetailModal job={job} />,
      {
        duration: 0,
        style: {
          width: "min(600px, 95vw)",
          maxHeight: "90vh",
          borderRadius: "16px",
          border: "none",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        },
        className: "job-modal-toast",
      }
    );
  }, []);

  const handleCompanyClick = useCallback((company: string) => {
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(company)}`, 
      '_blank',
      'noopener,noreferrer'
    );
  }, []);

  useEffect(() => {
    const option = { root: null, rootMargin: "200px", threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  if (isError) return <TechnicalError onRetry={() => refetch()} />;
  if (jobList.length === 0 && !isLoading) {
    return <EmptyState>No jobs found matching your criteria.</EmptyState>;
  }

  return (
    <>
      <ResultCount>{total} results found</ResultCount>
      <Grid>
        {jobList.map((job) => (
          // ✅ FIXED: New handlers prop structure
          <JobCard 
            key={job.id} 
            job={job}
            handlers={{
              onJobClick: openJobModal,
              onCompanyClick: handleCompanyClick,
            }}
          />
        ))}
      </Grid>

      <ObserverTarget ref={loaderRef}>
        {isLoading && <JobSkeleton count={3} />}
      </ObserverTarget>

      <Toaster 
        position="top-center"
        closeButton
        expand={false}
        richColors={false}
      />
    </>
  );
};

export const JobList: React.FC = () => {
  return (
    <ListContainer>
      <ErrorBoundary fallback={<StatusText>Something went wrong.</StatusText>}>
        <ListContent />
      </ErrorBoundary>
    </ListContainer>
  );
};

// Styled Components (unchanged)
const ListContainer = styled.div`
  width: 100%;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

const ObserverTarget = styled.div`
  padding: var(--spacing-xl) 0;
  min-height: 50px;
`;

const ResultCount = styled.div`
  font-size: var(--font-xs);
  color: var(--text-grey);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-lg);
`;

const StatusText = styled.div`
  padding: var(--spacing-xl) 0;
  color: var(--text-muted);
  font-size: var(--font-sm);
`;

const EmptyState = styled.div`
  padding: 60px 0;
  text-align: center;
  color: var(--text-muted);
  border-top: 1px solid var(--border-light);
`;
