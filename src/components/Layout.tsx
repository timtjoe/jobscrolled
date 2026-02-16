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


const Pane = styled.aside<{ $hideOnMobile: boolean }>`
  border-right: 1px solid var(--border-dim);
  overflow-y: auto;
  
  @media (max-width: 768px) { 
    display: ${p => (p.$hideOnMobile ? "none" : "block")}; 
    height: auto;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 380px 1fr;
  height: 100dvh; /* Use dynamic viewport height */
  background: var(--bg-black);
  overflow: hidden; /* Prevent body scroll */

  @media (max-width: 768px) { 
    grid-template-columns: 1fr;
    height: auto;
    overflow: visible;
  }
`;

const Main = styled.main<{ $showOnMobile: boolean }>`
  height: 100%;
  overflow-y: auto; /* This is the ONLY scrollbar for the right side */

  @media (max-width: 768px) { 
    display: ${p => (p.$showOnMobile ? "block" : "none")}; 
    overflow: visible; 
    height: auto;
  }
`;