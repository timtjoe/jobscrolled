import React from 'react';
import styled from 'styled-components';
import { useJobs } from '../useJobs';
import { ErrorBoundary, TechnicalError } from "@/components/errors";
import type { JobContract } from "../job.types";
import { JobSkeleton } from "@/components/Skeleton";

/**
 * 1. Compact Mini-Card (Media Object Pattern)
 */
const HNMiniCard: React.FC<{ job: JobContract }> = ({ job }) => (
  <MediaObject href={job.url} target="_blank" rel="noopener noreferrer">
    <div className="content">
      <JobTitle>{job.title}</JobTitle>
      <MetaLine>
        <span className="company">{job.company}</span>
        <span className="dot">•</span>
        <span className="location">{job.location}</span>
        {job.isRemote && <RemoteBadge>Remote</RemoteBadge>}
      </MetaLine>
    </div>
  </MediaObject>
);

/**
 * 2. Inner Content
 */
const HNContent: React.FC = () => {
const { data, isLoading, isError, refetch } = useJobs({
    search: "",
    type: "all",
    sortBy: "date",
    page: 1,
    pageSize: 10,
    source: "Hacker News"
  });

  // Sidebar uses fewer items
  if (isLoading) return <JobSkeleton count={5} />;

  if (isError) return <TechnicalError message="HN Offline" onRetry={() => refetch()} />;

  const { data: rawJobs = [] } = data || {};

  // Sort: Remote First, then Date
  const sortedJobs = [...rawJobs].sort((a, b) => {
    if (a.isRemote && !b.isRemote) return -1;
    if (!a.isRemote && b.isRemote) return 1;
    return 0; // Maintain date sort from hook
  }).slice(0, 6); // Display top 6

  if (sortedJobs.length === 0) return <EmptyText>No current jobs found.</EmptyText>;

  return (
    <List>
      {sortedJobs.map(job => (
        <HNMiniCard key={job.id} job={job} />
      ))}
    </List>
  );
};

export const HackerNewsFeed: React.FC = () => (
  <Section>
    <Title>HN Hiring</Title>
    <ErrorBoundary fallback={<p>Sidebar unavailable</p>}>
      <HNContent />
    </ErrorBoundary>
  </Section>
);

// --- Styled Components (Minimized & Media Object) ---

const Section = styled.aside`
  padding: 16px;
  background: #fdfdfd;
  border-radius: 8px;
  border: 1px solid #eee;
  border-top: 3px solid #ff6600;
`;

const Title = styled.h2`
  color: #ff6600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MediaObject = styled.a`
  display: flex;
  text-decoration: none;
  color: inherit;
  padding: 4px 0;
  transition: opacity 0.2s;
  &:hover { opacity: 0.7; }
`;

const JobTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 2px 0;
  color: #24292e;
  line-height: 1.3;
`;

const MetaLine = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: #6a737d;

  .company { font-weight: 500; color: #444; }
  .dot { color: #ccc; }
`;

const RemoteBadge = styled.span`
  background: #e6ffed;
  color: #22863a;
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const LoadingText = styled.p` font-size: 0.8rem; color: #999; `;
const EmptyText = styled.p` font-size: 0.8rem; color: #999; `;