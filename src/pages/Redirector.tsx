import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAtomValue } from "jotai";
import { useJobs } from "@/hooks/useJobs";
import { withJob } from "@/store/job.store";
import styled from "styled-components";

export const Redirector: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const filters = useAtomValue(withJob.filters);
  const { data, isLoading } = useJobs(filters);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const isMobile = window.innerWidth <= 768;

    if (!isMobile && !isLoading && data?.data?.[0]) {
      const firstJobId = data.data[0].id;
      navigate(`/jobs/${firstJobId}`, { replace: true });
    }
  }, [data, isLoading, navigate, location.pathname]);

  if (location.pathname === "/" && window.innerWidth > 768) {
    return (
      <EmptyState>
        {isLoading ? (
          <p>Analyzing opportunities...</p>
        ) : !data?.data?.length ? (
          <p>No jobs found. Try adjusting your filters.</p>
        ) : (
          <p>Selecting best match...</p>
        )}
      </EmptyState>
    );
  }

  return null;
};

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #888;
  font-size: 14px;
  background-color: #fff;
`;