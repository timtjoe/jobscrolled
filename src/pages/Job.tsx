import { useParams, Link, useNavigate } from "react-router";
import styled from "styled-components";
import { useJobs } from "@/hooks/useJobs";
import { useAtomValue } from "jotai";
import { withJob } from "@/store/job.store";
import { Viewer, Company } from "@/features/jobs";
import { RouteConfig } from "@/types";
import { Icons } from "@/components/icons";

export const JobPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const filters = useAtomValue(withJob.filters);
  const { data, isLoading } = useJobs(filters);

  const job = data?.data?.find((j) => String(j.id) === String(jobId));

  if (isLoading) return <Center>Loading details...</Center>;

  if (!job) return (
    <Center>
      <p>Job not found</p>
      <Link to="/" style={{ color: "var(--text-link)" }}>Return Home</Link>
    </Center>
  );

  return (
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
        </StickyWrapper>
      </Sidebar>
    </Grid>
  );
};

export const JobRoutes: RouteConfig = {
  path: "jobs/:jobId",
  element: <JobPage />,
};

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
      font-size: var(--font-xm);
      font-weight: 700;
      cursor: pointer;
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
  padding: 24px;
  @media (max-width: 1024px) {
    border-top: 1px solid var(--border-dim);
    margin-bottom: 80px; /* Space for the fixed Apply button footer */
  }
`;

const StickyWrapper = styled.div`
  @media (min-width: 1025px) {
    position: sticky;
    top: 40px;
  }
`;

const Center = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background: var(--bg-black);
  color: var(--text-muted);
`;