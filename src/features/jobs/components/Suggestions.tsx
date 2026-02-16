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
    return <img src={job.logo} alt="" onError={() => setIsError(true)} />;
  }

  return <Placeholder $bg={brandColor}>{firstLetter}</Placeholder>;
};

const SuggestionsContent: React.FC<SuggestionsProps> = ({
  jobs = [],
  title = "Similar Roles",
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
  padding:0 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid var(--border-dim);
`;

const Heading = styled.h3`
  font-size: var(--font-md);
  font-weight: 700;
  text-transform: capitalize;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  padding:var(--spacing-sm);
  padding-bottom:0;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const SuggestionCard = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: var(--spacing-xs);
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--bg-dark);
  }

  &.active {
    background: var(--bg-accent);
    pointer-events: none;
  }
`;

const LogoSection = styled.div`
  width: 40px;
  height: 39px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    border-radius: 2px;
    object-fit: cover;
    border: 1px solid var(--border-dim);
    background: white;
  }
`;

const Placeholder = styled.div<{ $bg: string }>`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background: ${(p) => p.$bg};
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
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--text-sub);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
`;

const Category = styled.span`
  font-size: var(--font-xxs);
  line-height: 15px;
  color: var(--text-muted);
  text-transform: capitalize;
  margin-top: 4px;
`;
