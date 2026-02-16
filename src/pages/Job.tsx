import { useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router";
import styled from "styled-components";
import { useJobs } from "@/hooks/useJobs";
import { useAtomValue } from "jotai";
import { withJob } from "@/store/job.store";
import { Viewer, Company, Suggestions } from "@/features/jobs";
import { ViewerSkeleton, SidebarSkeleton } from "@/components/Skeleton";
import { ErrorBoundary, TechnicalError } from "@/components/errors";
import { RouteConfig } from "@/types";
import { Icons } from "@/components/icons";
import type { JobContract } from "@/types/jobs";

const calculateSimilarity = (current: JobContract, other: JobContract) => {
  let score = 0;
  const words = current.title
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 2);
  const oTitle = other.title.toLowerCase();

  words.forEach((word) => {
    if (oTitle.includes(word)) score += 5;
  });

  const cType = Array.isArray(current.type) ? current.type : [current.type];
  const oType = Array.isArray(other.type) ? other.type : [other.type];
  if (cType.some((t) => oType.includes(t))) score += 3;

  if (current.location === other.location) score += 1;
  return score;
};

export const JobPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const filters = useAtomValue(withJob.filters);
  const { data, isLoading } = useJobs(filters);

  const job = data?.data?.find((j) => String(j.id) === String(jobId));

  const similarJobs = useMemo(() => {
    if (!job || !data?.data) return [];
    return data.data
      .filter((item) => String(item.id) !== String(jobId))
      .map((item) => ({ ...item, score: calculateSimilarity(job, item) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [job, data?.data, jobId]);

  if (isLoading)
    return (
      <Grid>
        <Content>
          <ViewerSkeleton />
        </Content>
        <Sidebar>
          <SidebarSkeleton />
        </Sidebar>
      </Grid>
    );

  if (!job)
    return (
      <Center>
        <p>Job not found</p>
        <Link to="/" style={{ color: "var(--text-link)" }}>
          Return Home
        </Link>
      </Center>
    );

  return (
    <ErrorBoundary
      fallback={<TechnicalError onRetry={() => window.location.reload()} />}
    >
      <Grid>
        <HeaderMobile>
          <button onClick={() => navigate("/")} className="back-btn">
            <Icons.arrow_left size={20} />
            <span>Job Details</span>
          </button>
        </HeaderMobile>

        <Content>
          <Viewer job={job} />
        </Content>

        <Sidebar>
          <StickyWrapper>
            <Company details={job} />
            <ErrorBoundary fallback={null}>
              <Suggestions jobs={similarJobs} title="Similar Opportunities" />
            </ErrorBoundary>
          </StickyWrapper>
        </Sidebar>
      </Grid>
    </ErrorBoundary>
  );
};

export const JobRoutes: RouteConfig = {
  path: "jobs/:jobId",
  element: <JobPage />,
};

/* --- STYLES --- */
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  background: var(--bg-black);
  min-height: 100vh;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;

const HeaderMobile = styled.header`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    position: sticky;
    top: 0;
    z-index: 110;
    background: var(--bg-overlay);
    backdrop-filter: blur(12px);
    padding: 12px 16px;
    border-bottom: 1px solid var(--border-dim);
    .back-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--text-white);
      font-weight: 700;
    }
  }
`;

const Content = styled.div`
  padding: 40px;
  @media (min-width: 1025px) {
    height: 100vh;
    overflow-y: auto;
    border-right: 1px solid var(--border-dim);
  }
  @media (max-width: 1024px) {
    padding: 24px;
  }
  `;

const Sidebar = styled.aside`
  /* On desktop, the container itself doesn't scroll, its child does */
  @media (min-width: 1025px) {
    height: 100vh;
    overflow: hidden; 
    border-right: 1px solid var(--border-dim);
  }

  @media (max-width: 1024px) {
    padding: 24px;
    border-top: 1px solid var(--border-dim);
    margin-bottom: 20px;
  }
`;

const StickyWrapper = styled.div`
  @media (min-width: 1025px) {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    padding: 0; /* Padding is usually handled inside Company/Suggestions */

    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none; 
    -ms-overflow-style: none;
  }
`;

const Center = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background: var(--bg-black);
  color: var(--text-muted);
`;