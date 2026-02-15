// pages/Homepage.tsx
import React from "react";
import styled from "styled-components";
import { JobList } from "@/features/jobs";
import {NewsList} from "@/features/news";

export const Homepage: React.FC = () => {
  return (
    <PageContainer>
      <ContentGrid>
        {/* Main Job List */}
        <MainContent>
          <JobList />
        </MainContent>

        {/* Sidebar with NewsList and Developer Portfolio */}
        <Sidebar>
          {/* Job Market News - TOP */}
          {/* <NewsList /> */}
          
          {/* Developer Portfolio - BELOW */}
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
        </Sidebar>
      </ContentGrid>
    </PageContainer>
  );
};

// ✅ FIXED: 900px MAX constraint respected
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 580px 280px;  /* 580 + 280 + 40px gap = 900px */
  gap: 40px;                           /* Perfect spacing within 900px */
  align-items: flex-start;
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 48px;                    /* ✅ Ample spacing for NewsList + Portfolio */
  
  /* ✅ NO STICKY - Normal document flow */
  position: static;
  height: auto;
`;

const PageContainer = styled.div`
  max-width: 900px;             /* ✅ YOUR SPECIFIED MAX */
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-lg);
`;

const MainContent = styled.main`
  min-width: 0;
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

// ✅ MOBILE - SIMPLIFIED (stacks naturally within 900px)
