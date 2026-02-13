// features/jobs/components/JobCard.tsx
import React from 'react';
import styled from 'styled-components';
import type { JobContract } from "../job.types";

export const JobCard: React.FC<{ job: JobContract }> = ({ job }) => (
  <CardAnchor href={job.url} target="_blank" rel="noopener noreferrer">
    <Content>
      <TitleRow>
        <JobTitle>{job.title}</JobTitle>
        {job.isRemote && <RemoteBadge>Remote</RemoteBadge>}
      </TitleRow>
      <MetaRow>
        <span className="company">{job.company}</span>
        <span className="dot">•</span>
        <span className="location">{job.location}</span>
        <span className="dot">•</span>
        <span className="source">{job.source}</span>
      </MetaRow>
    </Content>
  </CardAnchor>
);

const CardAnchor = styled.a`
  display: flex;
  padding: 16px 0;
  text-decoration: none;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s;
  &:hover { background: #fafafa; }
`;

const Content = styled.div` flex: 1; `;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

const JobTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: #666;
  .company { font-weight: 500; color: #333; }
  .dot { color: #ccc; }
`;

const RemoteBadge = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #22863a;
  background: #e6ffed;
  padding: 2px 6px;
  border-radius: 4px;
`;