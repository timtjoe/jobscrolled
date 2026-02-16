import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router";
import type { JobContract } from "@/types/jobs";
import { getLogoTheme } from "../utils";
import { ErrorBoundary } from "@/components/errors";

interface SuggestionsProps {
  jobs?: JobContract[];
  title?: string;
}

/**
 * Internal helper to handle image errors per item
 */
const SuggestionImage = ({ job }: { job: JobContract }) => {
  const [isError, setIsError] = useState(false);
  const brandColor = getLogoTheme(job.company);
  const firstLetter = job.company?.charAt(0).toUpperCase() || "?";

  if (job.logo && !isError) {
    return (
      <img 
        src={job.logo} 
        alt="" 
        onError={() => setIsError(true)} 
      />
    );
  }

  return (
    <Placeholder $bg={brandColor}>
      {firstLetter}
    </Placeholder>
  );
};

const SuggestionsContent: React.FC<SuggestionsProps> = ({ 
  jobs = [], 
  title = "Similar Roles" 
}) => {
  if (!jobs || jobs.length === 0) return null;

  return (
    <Wrapper>
      <Heading>{title}</Heading>
      <List>
        {jobs.map((job) => (
          <SuggestionCard key={job.id} to={`/jobs/${job.id}`}>
            <LogoSection>
              <SuggestionImage job={job} />
            </LogoSection>
            
            <Info>
              <JobTitle>{job.title}</JobTitle>
              <Category>
                {Array.isArray(job.type) ? job.type[0] : job.type || "General"}
              </Category>
            </Info>
          </SuggestionCard>
        ))}
      </List>
    </Wrapper>
  );
};

export const Suggestions: React.FC<SuggestionsProps> = (props) => (
  <ErrorBoundary fallback={null}>
    <SuggestionsContent {...props} />
  </ErrorBoundary>
);

/* --- STYLES --- */

const Wrapper = styled.div`
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid var(--border-dim);
  margin-top: 10px;
`;

const Heading = styled.h3`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  padding: 0 24px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const SuggestionCard = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 24px;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: var(--bg-dark);
  }

  &.active {
    background: var(--bg-accent-soft);
    pointer-events: none;
    opacity: 0.7;
  }
`;

const LogoSection = styled.div`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    object-fit: cover;
    border: 1px solid var(--border-dim);
    background: white;
  }
`;

const Placeholder = styled.div<{ $bg: string }>`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background: ${p => p.$bg};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const JobTitle = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-sub);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
`;

const Category = styled.span`
  font-size: 11px;
  color: var(--text-muted);
  text-transform: capitalize;
  margin-top: 2px;
`;