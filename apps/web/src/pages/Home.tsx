import React from "react";
import styled from "styled-components";
// We import from the barrel file (index.ts) for a clean API
import { JobList } from "@/features/jobs";

export const Homepage: React.FC = () => {
  return (
    <PageContainer>
      <HeroSection>
        <Title>Find Your Next Opportunity</Title>
        <Subtitle>
          We aggregate the best remote and tech jobs from across the web.
        </Subtitle>
      </HeroSection>

      <ContentSection>
        {/* The Homepage doesn't care about useJobs anymore. 
          JobList handles its own loading, error, and filtering states. 
        */}
        <JobList />
      </ContentSection>
    </PageContainer>
  );
};

// --- Styled Components ---

const PageContainer = styled.main`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const HeroSection = styled.header`
  background-color: #ffffff;
  padding: 60px 20px;
  text-align: center;
  border-bottom: 1px solid #eaeaea;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #111;
  margin-bottom: 10px;
  font-weight: 800;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
`;

const ContentSection = styled.section`
  padding: 40px 0;
`;