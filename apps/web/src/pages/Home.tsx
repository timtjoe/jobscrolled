// pages/Homepage.tsx
import React from "react";
import styled from "styled-components";
import { JobList, HackerNewsFeed } from "@/features/jobs";

export const Homepage: React.FC = () => {
  return (
    <PageContainer>
      <ContentGrid>
        {/* Main Job List */}
        <MainContent>
          <JobList />
        </MainContent>

        {/* Sidebar with Developer Info and HN Feed */}
        <Sidebar>
          <PortfolioSection>
            <MiniTitle>Developer Portfolio</MiniTitle>
            <BioText>
              Architecting interfaces that transform complex APIs into seamless 
              visual experiences. 5+ years building fast, accessible UIs. 
              Currently open to <strong>Frontend Engineering</strong> roles.
            </BioText>
            <ContactLinks>
              <a href="mailto:timtjoe@gmail.com">Email</a>
              <span>•</span>
              <a href="https://wa.me/+231770934646" target="_blank">WhatsApp</a>
              <span>•</span>
              <a href="https://github.com/timtjoe" target="_blank">GitHub</a>
            </ContactLinks>
          </PortfolioSection>

          <HackerNewsFeed />
        </Sidebar>
      </ContentGrid>
    </PageContainer>
  );
};

// pages/Homepage.tsx

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 600px 300px;
  gap: 60px;
  align-items: flex-start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr; /* Stack columns */
    width: 100%;
    gap: 40px;
  }
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 48px;
  
  /* Sticky only on Desktop */
  @media (min-width: 901px) {
    position: sticky;
    top: 88px;
    height: fit-content;
  }

  @media (max-width: 900px) {
    position: static; /* Normal flow on mobile */
    order: 2; /* Ensure it follows the job list */
    padding-top: var(--spacing-xl);
    border-top: 1px solid var(--border-light);
  }
`;

// --- Styled Components ---


const PageContainer = styled.div`
  max-width: 900px; /* Your total width requirement */
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-lg);
`;


const MainContent = styled.main`
  min-width: 0;
  /* This will scroll naturally as part of the body */
`;



const PortfolioSection = styled.section`
  padding-bottom: var(--spacing-xl);
  border-bottom: 1px solid var(--border-light);
`;

const MiniTitle = styled.h2`
  font-size: var(--font-xxs);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text-grey);
  margin-bottom: var(--spacing-md);
`;

const BioText = styled.p`
  font-size: var(--font-sm);
  line-height: 1.6;
  color: var(--text-muted);
  margin-bottom: var(--spacing-lg);
  
  strong {
    color: var(--text-black);
  }
`;

const ContactLinks = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  font-size: var(--font-xs);
  
  a {
    color: var(--text-black);
    font-weight: 500;
    &:hover { border-bottom: 1px solid var(--text-black); }
  }

  span { color: var(--border-gray); }
`;