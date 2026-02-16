import { useParams, Link } from "react-router";
import styled from "styled-components";
import { useJobs } from "@/hooks/useJobs";
// Assuming you have a hook like this, if not, we'll use the list
import { useAtomValue } from "jotai";
import { withJob } from "@/store/job.store";
import { Viewer, Company } from "@/features/jobs";
import { RouteConfig } from "@/types";

export const JobPage = () => {
  const { jobId } = useParams();
  const filters = useAtomValue(withJob.filters);
  
  // 1. Get the list of jobs
  const { data, isLoading } = useJobs(filters);

  // 2. Look for job in the cached list
  const job = data?.data?.find((j) => String(j.id) === String(jobId));

  // 3. Handle Loading State
  if (isLoading) {
    return <Center>Loading details...</Center>;
  }

  // 4. Final check: If data is loaded but job is not in the array
  if (!job) {
    return (
      <Center>
        <p>Job #{jobId} not found in current list.</p>
        <Back to="/" style={{ display: "block" }}>← Back to list</Back>
      </Center>
    );
  }

  return (
    <Grid>
      <Back to="/">← Back to list</Back>
      <Content>
        <Viewer job={job} />
      </Content>
      <Sidebar>
        <Company details={job} />
      </Sidebar>
    </Grid>
  );
};

export const JobRoutes: RouteConfig = {
  path: "jobs/:jobId",
  element: <JobPage />,
};

/* --- STYLES (Keep as you had them) --- */
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  height: 100%;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    overflow-y: auto;
  }
`;

const Content = styled.div`
  padding: 40px 20px;
  overflow-y: auto;
  border-right: 1px solid #eee;
  @media (max-width: 768px) { border-right: none; }
`;

const Sidebar = styled.div`
  padding: 20px;
  background: var(--bg-black);
`;

const Back = styled(Link)`
  display: none;
  padding: 15px;
  text-decoration: none;
  color: #007aff;
  font-weight: 500;
  @media (max-width: 768px) { display: block; }
`;

const Center = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
  color: #666;
`;