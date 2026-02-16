import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAtomValue } from "jotai";
import { useJobs } from "@/hooks/useJobs";
import { withJob } from "@/store/job.store";
import styled from "styled-components";
import { ViewerSkeleton } from "@/components/Skeleton";

export const Redirector: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const filters = useAtomValue(withJob.filters);
  const { data, isLoading } = useJobs(filters);

  // Use a simpler check for desktop view
  const isDesktop = typeof window !== "undefined" && window.innerWidth > 768;

  useEffect(() => {
    // Only redirect if we are on the base route
    if (location.pathname !== "/") return;

    if (isDesktop && !isLoading && data?.data?.[0]) {
      const firstJobId = data.data[0].id;
      navigate(`/jobs/${firstJobId}`, { replace: true });
    }
  }, [data, isLoading, navigate, location.pathname, isDesktop]);

  // On desktop, while we are at "/", show the skeleton or empty state
  if (location.pathname === "/" && isDesktop) {
    return (
      <Container>
        {isLoading ? (
          <ViewerSkeleton />
        ) : !data?.data?.length ? (
          <Message>No jobs found. Try adjusting your filters.</Message>
        ) : (
          <ViewerSkeleton /> 
        )}
      </Container>
    );
  }

  return null;
};

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: var(--bg-black);
  overflow: hidden;
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-muted);
  font-size: var(--font-sm);
`;