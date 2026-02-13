// features/jobs/components/JobList.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { useJobs } from "../useJobs";
import { JobCard } from "./JobCard";
import { HackerNewsFeed } from "./HNFeed";
import { ErrorBoundary, TechnicalError } from "@/components/errors";
import type { JobFilters } from "../job.types";
import { JobSkeleton } from "@/components/Skeleton";

const ListContent: React.FC<{ filters: JobFilters }> = ({ filters }) => {
 const { data, isLoading, isError, refetch } = useJobs(filters);

  // Use skeleton for loading
  if (isLoading) return <JobSkeleton count={filters.pageSize} />;

  if (isError) return <TechnicalError onRetry={() => refetch()} />;

  const { data: jobList = [], total = 0 } = data || {};
  if (jobList.length === 0) {
    return <EmptyState>No jobs found matching your criteria.</EmptyState>;
  }

  return (
    <>
      <ResultCount>{total} results</ResultCount>
      <Grid>
        {jobList.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </Grid>
    </>
  );
};

export const JobList: React.FC = () => {
  const [filters, setFilters] = useState<JobFilters>({
    search: "",
    type: "all",
    sortBy: "date",
    page: 1,
    pageSize: 15,
  });

  const { data } = useJobs(filters);
  const totalPages = Math.ceil((data?.total ?? 0) / filters.pageSize);

  const updatePage = (page: number) => {
    setFilters(f => ({ ...f, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <LayoutContainer>
      <ListWrapper>
        <HeaderContainer>
          <SearchInput
            placeholder="Filter by title or company..."
            value={filters.search}
            onChange={(e) => setFilters(f => ({ ...f, search: e.target.value, page: 1 }))}
          />
          <FilterBar>
            {(["all", "remote", "onsite"] as const).map((type) => (
              <FilterTag
                key={type}
                $active={filters.type === type}
                onClick={() => setFilters(f => ({ ...f, type, page: 1 }))}
              >
                {type}
              </FilterTag>
            ))}
          </FilterBar>
        </HeaderContainer>

        <ErrorBoundary fallback={<StatusText>Something went wrong.</StatusText>}>
          <ListContent filters={filters} />
        </ErrorBoundary>

        {totalPages > 1 && (
          <Pagination>
            <NavBtn disabled={filters.page === 1} onClick={() => updatePage(filters.page - 1)}>
              ← Previous
            </NavBtn>
            <PageNum>Page {filters.page} of {totalPages}</PageNum>
            <NavBtn disabled={filters.page >= totalPages} onClick={() => updatePage(filters.page + 1)}>
              Next →
            </NavBtn>
          </Pagination>
        )}
      </ListWrapper>

      <Sidebar>
        <HackerNewsFeed />
      </Sidebar>
    </LayoutContainer>
  );
};

// --- Styled Components (Minimal & Clean) ---

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 48px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const ListWrapper = styled.main` flex: 1; `;
const Sidebar = styled.aside` display: flex; flex-direction: column; gap: 32px; `;

const HeaderContainer = styled.div` margin-bottom: 24px; `;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 0;
  font-size: 1.25rem;
  border: none;
  border-bottom: 2px solid #eee;
  outline: none;
  transition: border-color 0.2s;
  &:focus { border-color: #333; }
  &::placeholder { color: #ccc; }
`;

const FilterBar = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;

const FilterTag = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 0;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  color: ${p => p.$active ? '#333' : '#aaa'};
  border-bottom: 2px solid ${p => p.$active ? '#333' : 'transparent'};
  &:hover { color: #333; }
`;

const ResultCount = styled.div`
  font-size: 0.75rem;
  color: #aaa;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const Grid = styled.div` display: flex; flex-direction: column; `;

const StatusText = styled.div` padding: 40px 0; color: #999; font-size: 0.9rem; `;

const EmptyState = styled.div`
  padding: 60px 0;
  text-align: center;
  color: #999;
  border-top: 1px solid #eee;
`;

const Pagination = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #eee;
`;

const NavBtn = styled.button`
  background: none;
  border: none;
  font-weight: 600;
  cursor: pointer;
  &:disabled { color: #eee; cursor: not-allowed; }
`;

const PageNum = styled.span` font-size: 0.85rem; color: #999; `;