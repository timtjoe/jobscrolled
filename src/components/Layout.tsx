import { Outlet, useParams } from "react-router";
import styled from "styled-components";
import { JobList } from "@/features/jobs/components/JobList";
import { Sidebar } from "./Sidebar";

export const Layout = () => {
  const { jobId } = useParams();

  return (
    <Container>
      <Pane $hideOnMobile={!!jobId}>
        <Sidebar />
        <JobList />
      </Pane>
      <Main $showOnMobile={!!jobId}>
        <Outlet />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  max-width: var(--breakpoint-lg);
  height: 100dvh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 378px 1fr;
  background: var(--bg-black);
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: auto; /* Allow window to scroll */
    overflow: visible; 
  }
`;

const Pane = styled.aside<{ $hideOnMobile: boolean }>`
  border-right: 1px solid var(--border-dim);
  border-left: 1px solid var(--border-dim);
  overflow-y: auto;

  @media (max-width: 768px) {
    display: ${(p) => (p.$hideOnMobile ? "none" : "block")};
    height: auto;
    overflow-y: visible; /* CRITICAL: Sticky won't work if this is hidden or auto */
  }
`;


const Main = styled.main<{ $showOnMobile: boolean }>`
  height: 100%;
  overflow-y: auto; /* This is the ONLY scrollbar for the right side */

  @media (max-width: 768px) {
    display: ${(p) => (p.$showOnMobile ? "block" : "none")};
    overflow: visible;
    height: auto;
  }
`;
