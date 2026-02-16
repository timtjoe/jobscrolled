import React, { useMemo } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import styled from "styled-components";
import { ErrorBoundary, TechnicalError } from "@/components/errors";
import type { JobContract } from "@/types/jobs";
import { formatCompactNumber } from "../utils"; // Import the utility

interface ViewerProps {
  job: JobContract;
}

export const Viewer: React.FC<ViewerProps> = ({ job }) => {
  // Memoize cleaning logic for performance
  const parsedContent = useMemo(() => {
    const cleanHtml = (job.description || "")
      .replace(/Please mention the word.*$/i, "")
      .replace(/#\w+=/g, "")
      .replace(/\u00e2/g, "");

    const sanitized = DOMPurify.sanitize(cleanHtml, {
      ALLOWED_TAGS: ["p", "strong", "em", "b", "i", "ul", "ol", "li", "a", "h1", "h2", "h3", "br"],
      ALLOWED_ATTR: ["href"],
    });

    return parse(sanitized);
  }, [job.description]);

  // Format salary using the compact utility
  const salary = job?.salary;
  const salaryDisplay = (salary?.min && salary?.max)
    ? `${formatCompactNumber(salary.min)} - ${formatCompactNumber(salary.max)} ${salary.currency || 'USD'}`
    : "Competitive Salary";

  return (
    <ErrorBoundary fallback={<TechnicalError onRetry={() => window.location.reload()} />}>
      <OuterWrapper>
        <ViewerContainer>
          <Header>
            <JobTitle>{job.title || "Untitled Position"}</JobTitle>
            <LocationText>{job.location}</LocationText>
            
            <PerksRow>
              <span className="salary">{salaryDisplay}</span>
              
              {job.isRemote && (
                <span className="remote-status">Remote</span>
              )}
              
              {/* Optional: Add other contract types if available in your type */}
              <span>Full-time</span>
            </PerksRow>
          </Header>

          <ContentBody>
            <SectionTitle>About the role</SectionTitle>
            <HtmlWrapper>{parsedContent}</HtmlWrapper>
          </ContentBody>
        </ViewerContainer>
      </OuterWrapper>
    </ErrorBoundary>
  );
};

/* --- STYLES --- */

/* Update these styles in your Viewer component */

const OuterWrapper = styled.div`
  height: auto; /* Remove 100% or 100vh */
  min-height: 100%;
`;

const ViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--bg-black);
  
  /* Desktop padding */
  @media (min-width: 769px) {
    padding: 40px;
    /* Remove overflow-y: auto here! */
  }

  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;


const Header = styled.div`
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-dim);
`;

const JobTitle = styled.h1`
  font-size: var(--font-lg, 20px);
  line-height: 24px;
  font-weight: 700;
  color: var(--text-sub);
  margin-bottom: 4px;
`;

const LocationText = styled.p`
  font-size: var(--font-sm, 14px);
  color: var(--text-muted);
  margin-bottom: 12px;
`;

const PerksRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: var(--font-sm, 14px);
  color: var(--text-muted);

  .salary {
    font-weight: 600;
  }

  .remote-status {
    color: var(--text-link); /* Highlighting remote in blue */
    font-weight: 600;
  }

  span:not(:last-child)::after {
    content: "•";
    margin-left: 8px;
    color: var(--border-dim);
  }
`;

const ContentBody = styled.div`
  padding-top: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 16px;
`;

const HtmlWrapper = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: var(--text-main);

  p { margin-bottom: 20px; }
  
  strong, b { 
    color: var(--text-white); 
    font-weight: 700; 
  }

  ul, ol { 
    padding-left: 20px; 
    margin-bottom: 20px; 
    li { margin-bottom: 8px; }
  }

  a { 
    color: var(--text-link); 
    text-decoration: none; 
    &:hover { text-decoration: underline; } 
  }

  h1, h2, h3 { 
    color: var(--text-white); 
    margin: 24px 0 12px; 
    font-size: var(--font-xm, 17px);
  }
`;