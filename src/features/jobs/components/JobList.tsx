import React, { useEffect, useRef, useCallback, useMemo } from "react";
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

// ✅ NEW: FilterControls Component (MOVED from AppBar)
const FilterControls: React.FC = () => {
  const [filters, setFilters] = useAtom(jobFiltersAtom);

  const handleType = (type: typeof filters.type) =>
    setFilters((prev) => ({ ...prev, type, page: 1 }));

  return (
    <FilterChips>
      {(["all", "remote", "onsite"] as const).map((t) => (
        <ChipBtn
          key={t}
          $active={filters.type === t}
          onClick={() => handleType(t)}
        >
          {t.toUpperCase()}
        </ChipBtn>
      ))}
    </FilterChips>
  );
};

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

  const jobHandlers = useMemo(() => ({
    onJobClick: openJobModal,
    onCompanyClick: handleCompanyClick,
  }), [openJobModal, handleCompanyClick]);

  useEffect(() => {
    const option = { root: null, rootMargin: "200px", threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);
    
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  if (isError) return <TechnicalError onRetry={() => refetch()} />;
  if (jobList.length === 0 && !isLoading) {
    return <EmptyState>No jobs found matching your criteria.</EmptyState>;
  }

  return (
    <>
      {/* ✅ FILTERS MOVED HERE - FEATURE ENCAPSULATED */}
      <FilterControls />
      
      <ResultCount>{total} results found</ResultCount>
      <Grid>
        {jobList.map((job) => (
          <JobCard 
            key={job.id} 
            job={job}
            handlers={jobHandlers}
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

// ✅ ADDED Filter Styles (from AppBar)
const FilterChips = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--border-light);
`;

const ChipBtn = styled.button<{ $active: boolean }>`
  height: 32px;
  padding: 0 var(--spacing-md);
  border: 1px solid ${(p) => (p.$active ? "var(--text-black)" : "var(--border-light)")};
  border-radius: 16px;
  background: ${(p) => (p.$active ? "var(--text-black)" : "var(--bg-white)")};
  color: ${(p) => (p.$active ? "var(--bg-white)" : "var(--text-black)")};
  font-size: var(--font-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  
  &:hover {
    border-color: var(--text-black);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

// Existing styles unchanged...
const ListContainer = styled.div` width: 100%; `;
const Grid = styled.div` display: flex; flex-direction: column; gap: var(--spacing-md); `;
const ObserverTarget = styled.div` padding: var(--spacing-xl) 0; min-height: 50px; `;
const ResultCount = styled.div` font-size: var(--font-xs); color: var(--text-grey); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--spacing-lg); `;
const StatusText = styled.div` padding: var(--spacing-xl) 0; color: var(--text-muted); font-size: var(--font-sm); `;
const EmptyState = styled.div` padding: 60px 0; text-align: center; color: var(--text-muted); border-top: 1px solid var(--border-light); `;
