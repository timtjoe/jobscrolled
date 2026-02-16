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
  // 1. Show skeleton during fetch
  if (isLoading) return <ViewerSkeleton />;

  // 2. Return empty screen if no job is selected/found
  if (!job) return null;

  // 3. Process Description
  const content = useMemo(() => {
    if (!job.description) return null;
    const sanitized = DOMPurify.sanitize(
      job.description
        .replace(/Please mention the word.*$/i, "")
        .replace(/#\w+=/g, ""),
      {
        ALLOWED_TAGS: ["p", "strong", "em", "b", "i", "ul", "ol", "li", "a", "h1", "h2", "h3", "br"],
        ALLOWED_ATTR: ["href"],
      }
    );
    return parse(sanitized);
  }, [job.description]);

  // 4. Handle Salary (Dynamic fallback)
  const salaryText = useMemo(() => {
    if (!job.salary?.min || !job.salary?.max) return null;
    const { min, max, currency } = job.salary;
    return `${formatCompactNumber(min)} - ${formatCompactNumber(max)} ${currency || "USD"}`;
  }, [job.salary]);

  // 5. Handle Employment Type (String or Array)
  const typeText = useMemo(() => {
    if (!job.type) return null;
    return Array.isArray(job.type) ? job.type.join(", ") : job.type;
  }, [job.type]);

  return (
    <ErrorBoundary fallback={<TechnicalError onRetry={() => window.location.reload()} />}>
      <Root>
        <header>
          <h1>{job.title}</h1>
          {job.location && <p className="loc">{job.location}</p>}
          
          <div className="perks">
            {salaryText && <span className="bold">{salaryText}</span>}
            {job.isRemote && <span className="blue">Remote</span>}
            {typeText && <span>{typeText}</span>}
          </div>
        </header>

        {content && (
          <section>
            {/* Header only shows if content exists */}
            <div className="html">{content}</div>
          </section>
        )}
      </Root>
    </ErrorBoundary>
  );
};

/* --- STYLES --- */

const Root = styled.div`
  padding: 40px;
  background: var(--bg-black);
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    padding: 24px 20px;
  }

  header {
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border-dim);
    
    h1 {
      font-size: 22px;
      font-weight: 700;
      color: var(--text-sub);
      margin-bottom: 6px;
      line-height: 1.3;
    }
    
    .loc {
      font-size: 15px;
      color: var(--text-muted);
      margin-bottom: 14px;
    }
    
    .perks {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      font-size: 14px;
      color: var(--text-muted);
      
      .bold { font-weight: 600; color: var(--text-main); }
      .blue { color: var(--text-link); font-weight: 600; }
      
      /* Logic for dots between available perks */
      span:not(:last-child)::after {
        content: "•";
        margin-left: 10px;
        color: var(--border-dim);
      }
    }
  }

  section {
    padding-top: 32px;
    
    .html {
      font-size: 15px;
      line-height: 1.7;
      color: var(--text-main);

      p { margin-bottom: 1.5rem; }
      
      ul, ol { 
        padding-left: 1.25rem; 
        margin-bottom: 1.5rem;
        li { margin-bottom: 0.5rem; }
      }

      strong, b { color: var(--text-white); font-weight: 700; }
      
      a { 
        color: var(--text-link); 
        text-decoration: underline;
        text-underline-offset: 2px;
      }

      h1, h2, h3 {
        color: var(--text-white);
        margin: 2rem 0 1rem;
        font-size: 18px;
        font-weight: 700;
      }
    }
  }
`;