import React, { useState } from 'react';
import styled from 'styled-components';
import type { JobContract, JobCardProps } from '../job.types';
import { ErrorBoundary, TechnicalError } from '@/components/errors';

/**
 * 1. The Pure Presentation Component
 * It assumes data is valid. If something here fails 
 * (like a null check or date parsing), the Boundary catches it.
 */
const CardContent: React.FC<JobCardProps> = ({ job }) => {
  // Defensive check: if job is missing, throw to trigger boundary
  if (!job) throw new Error("Job data is required");

  return (
    <CardContainer>
      <Header>
        <Title>{job.title}</Title>
        <SourceTag source={job.source}>{job.source}</SourceTag>
      </Header>
      
      <MetaInfo>
        <Company>{job.company}</Company>
        <DotSeparator>•</DotSeparator>
        <Location>{job.location}</Location>
      </MetaInfo>

      <Description 
        dangerouslySetInnerHTML={{ 
          __html: job.description?.substring(0, 160) + "..." 
        }} 
      />

      <Footer>
        <DateText>
          {job.postedAt ? new Date(job.postedAt).toLocaleDateString() : 'Date N/A'}
        </DateText>
        <ApplyButton href={job.url} target="_blank" rel="noopener noreferrer">
          View Details
        </ApplyButton>
      </Footer>
    </CardContainer>
  );
};

/**
 * 2. The Smart Wrapper Component
 * Handles the Error Boundary and the "Job" prop passing.
 */
export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [resetKey, setResetKey] = useState(0);

  const handleRetry = () => {
    setResetKey((prev) => prev + 1);
  };

  return (
    <ErrorBoundary
      key={resetKey} // Changing the key unmounts and remounts the component
      fallback={
        <TechnicalError
          message={`Failed to load job from ${job.source}`}
          onRetry={handleRetry}
          autoRetrySeconds={10}
        />
      }
    >
      <CardContent job={job} />
    </ErrorBoundary>
  );
};

// --- Styled Components (Moved to bottom for scannability) ---

const CardContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e1e4e8;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.15rem;
  color: #1a1a1a;
  font-weight: 600;
`;

const SourceTag = styled.span<{ source: string }>`
  font-size: 0.7rem;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  background: #f0f2f5;
  color: #586069;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #4a4a4a;
  margin-bottom: 12px;
`;

const Company = styled.span` font-weight: 600; `;
const Location = styled.span` color: #6a737d; `;
const DotSeparator = styled.span` margin: 0 8px; color: #d1d5da; `;

const Description = styled.div`
  font-size: 0.88rem;
  color: #444;
  line-height: 1.5;
  margin-bottom: 16px;
  p { margin: 0; }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f6f8fa;
  padding-top: 12px;
`;

const DateText = styled.span`
  font-size: 0.8rem;
  color: #6a737d;
`;

const ApplyButton = styled.a`
  text-decoration: none;
  background-color: #007bff;
  color: white;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  &:hover { background-color: #0056b3; }
`;