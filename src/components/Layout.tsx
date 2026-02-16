import { Outlet, useParams } from "react-router";
import styled from "styled-components";
import { JobList } from "@/features/jobs/components/JobList";

export const Layout = () => {
  const { jobId } = useParams();

  return (
    <Container>
      <Pane $hideOnMobile={!!jobId}>
        <JobList />
      </Pane>
      <Main $showOnMobile={!!jobId}>
        <Outlet />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 380px 1fr;
  height: 100vh;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const Pane = styled.aside<{ $hideOnMobile: boolean }>`
  border-right: 1px solid #eee;
  overflow-y: auto;
  @media (max-width: 768px) { 
    display: ${p => (p.$hideOnMobile ? "none" : "block")}; 
  }
`;

const Main = styled.main<{ $showOnMobile: boolean }>`
  flex: 1;
  overflow: hidden;
  @media (max-width: 768px) { 
    display: ${p => (p.$showOnMobile ? "block" : "none")}; 
  }
`;