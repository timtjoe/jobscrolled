import React, { useState } from "react";
import styled from "styled-components";
import { useJobs } from "../useJobs";
import { JobCard } from "./JobCard";
import { ErrorBoundary, TechnicalError } from "@/components/errors";

/**
 * 1. The Inner Content Component
 * This handles the actual data display logic. 
 * We separate this so the ErrorBoundary can wrap it effectively.
 */
const ListContent: React.FC<{ search: string }> = ({ search }) => {
  const { data: jobs, isLoading, isError, refetch } = useJobs({ search });

  if (isLoading) return <LoadingText>Fetching aggregated jobs...</LoadingText>;

  // If React Query catches a fetch error, we throw it to the Boundary
  if (isError) {
    return (
      <TechnicalError 
        message="We couldn't reach the job providers." 
        onRetry={() => refetch()} 
      />
    );
  }

  if (jobs?.length === 0) {
    return <EmptyState>No jobs found matching "{search}"</EmptyState>;
  }

  return (
    <>
      <ResultCount>{jobs?.length} jobs found</ResultCount>
      <Grid>
        {jobs?.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </Grid>
    </>
  );
};

/**
 * 2. The Main Component (The Assembler)
 */
export const JobList: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [resetKey, setResetKey] = useState(0);

  const handleGlobalRetry = () => {
    setResetKey(prev => prev + 1);
  };

  return (
    <ListWrapper>
      <SearchSection>
        <SearchInput
          type="text"
          placeholder="Search for your next role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchSection>

      <ErrorBoundary
        key={resetKey}
        fallback={
          <TechnicalError 
            message="The job list encountered a critical error." 
            onRetry={handleGlobalRetry} 
          />
        }
      >
        <ListContent search={search} />
      </ErrorBoundary>
    </ListWrapper>
  );
};

// --- Styled Components (Bottom) ---

const ListWrapper = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
`;

const SearchSection = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 14px 20px;
  font-size: 1.1rem;
  border: 2px solid #e1e4e8;
  border-radius: 10px;
  outline: none;
  &:focus { border-color: #007bff; }
`;

const ResultCount = styled.div`
  font-size: 0.85rem;
  color: #6a737d;
  font-weight: 500;
  margin-bottom: 16px;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 40px;
  color: #007bff;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px;
  color: #6a737d;
`;