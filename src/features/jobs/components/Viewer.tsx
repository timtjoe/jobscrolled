import React, { useMemo } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { ErrorBoundary, TechnicalError } from "@/components/errors";
import { formatCompactNumber } from "../utils";
import { ViewerSkeleton } from "@/components/Skeleton";
import type { JobContract } from "@/types/jobs";

interface ViewerProps {
  job?: JobContract | null;
  isLoading?: boolean;
}

export const Viewer: React.FC<ViewerProps> = ({ job, isLoading }) => {
  if (isLoading) return <ViewerSkeleton />;
  if (!job) return null;

  const content = useMemo(() => {
    if (!job.description) return null;
    const sanitized = DOMPurify.sanitize(
      job.description
        .replace(/Please mention the word.*$/i, "")
        .replace(/#\w+=/g, ""),
      {
        ALLOWED_TAGS: [
          "p",
          "strong",
          "em",
          "b",
          "i",
          "ul",
          "ol",
          "li",
          "a",
          "h1",
          "h2",
          "h3",
          "br",
        ],
        ALLOWED_ATTR: ["href"],
      },
    );
    return parse(sanitized);
  }, [job.description]);

  const salaryText = useMemo(() => {
    if (!job.salary?.min || !job.salary?.max) return null;
    const { min, max, currency } = job.salary;
    return `${formatCompactNumber(min)} - ${formatCompactNumber(max)} ${currency || "USD"}`;
  }, [job.salary]);

  const typeText = useMemo(() => {
    if (!job.type) return null;
    return Array.isArray(job.type) ? job.type.join(", ") : job.type;
  }, [job.type]);

  return (
    <ErrorBoundary
      fallback={<TechnicalError onRetry={() => window.location.reload()} />}
    >
      <Root>
        <Header>
          <Title>{job.title}</Title>

          <MetaRow>
            <CompanyName>{job.company}</CompanyName>
            <Location>, {job.location || "Global"}</Location>
            <Dot>•</Dot>
            <WorkBadge $isRemote={!!job.isRemote}>
              {job.isRemote ? "Remote" : "On-site"}
            </WorkBadge>
          </MetaRow>

          <PerksRow>
            {salaryText && (
              <>
                <span className="salary">{salaryText}</span>
                <Dot>•</Dot>
              </>
            )}
            {typeText && <span>{typeText}</span>}
          </PerksRow>
        </Header>

        {content && (
          <DescriptionSection>
            <HtmlContent>{content}</HtmlContent>
          </DescriptionSection>
        )}
      </Root>
    </ErrorBoundary>
  );
};

/* --- STYLES --- */

const Root = styled.div`
  padding: var(--spacing-md);
  background: var(--bg-black);
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    padding: var(--spacing-sm);
  }
`;

const Header = styled.header`
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-dim);
`;

const Title = styled.h1`
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--text-sub);
  margin-bottom: 12px;
  line-height: 26px;
  letter-spacing: 0.02em;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-md);
  line-height: 20px;
  color: var(--text-muted);
`;

const CompanyName = styled.span`
  color: var(--text-sub);
`;

const Location = styled.span`
  color: var(--text-muted);
`;

const PerksRow = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-sm);
  line-height: 16px;
  color: var(--text-main);
  margin-top: var(--spacing-sm);
  
  .salary {
    color: var(--text-main);
    font-weight: normal;
    max-width: 140px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const WorkBadge = styled.span<{ $isRemote: boolean }>`
  color: ${(p) => (p.$isRemote ? "var(--text-lavender)" : "var(--text-muted)")};
`;

const Dot = styled.span`
  margin: 0 8px;
  color: var(--border-dim);
  font-size: 10px;
  flex-shrink: 0;
`;

const DescriptionSection = styled.section`
  padding-top: var(--spacing-md);
`;

const HtmlContent = styled.div`
  font-size: var(--font-md);
  line-height: 24px;
  color: var(--text-sub);

  p {
    margin-bottom: var(--spacing-md);
  }

  ul,
  ol {
    padding-left: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
    li {
      margin-bottom: var(--spacing-md);
    }
  }

  strong,
  b {
    font-weight: 700;
    color: var(--text-white);
  }

  a {
    color: var(--text-link);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  h1,
  h2,
  h3 {
    color: var(--text-sub);
    margin: var(--spacing-sm) 0;
    font-size: var(--font-lg);
    line-height: 28px;
    font-weight: 700;
  }
`;
