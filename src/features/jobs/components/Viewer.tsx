import React from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import styled from "styled-components";
import { ErrorBoundary, TechnicalError } from "@/components/errors";
import type { JobContract } from "@/types/jobs";

interface ViewerProps {
  job: JobContract;
}

export const Viewer: React.FC<ViewerProps> = ({ job }) => {
  const parseSafeHTML = (html: string) => {
    const cleanHtml = html
      .replace(/Please mention the word.*$/i, "")
      .replace(/#\w+=/g, "")
      .replace(/\u00e2/g, "");

    const sanitized = DOMPurify.sanitize(cleanHtml, {
      ALLOWED_TAGS: [
        "p", "strong", "em", "b", "i", "ul", "ol", "li", "a", 
        "h1", "h2", "h3", "br"
      ],
      ALLOWED_ATTR: ["href"],
    });

    return parse(sanitized);
  };

  return (
    <ErrorBoundary
      fallback={<TechnicalError onRetry={() => window.location.reload()} />}
    >
      <OuterWrapper>
        <ViewerContainer>
          <Header>
            <Title>{job.title}</Title>
            <InfoGrid>
              <InfoItem>
                <Label>Location</Label>
                <Value>
                  {job.location} {job.isRemote && "🌍"}
                </Value>
              </InfoItem>
              {job.salary && (
                <InfoItem>
                  <Label>Salary Range</Label>
                  <Value>
                    {job.salary.min?.toLocaleString()} -{" "}
                    {job.salary.max?.toLocaleString()} {job.salary.currency}
                  </Value>
                </InfoItem>
              )}
            </InfoGrid>
          </Header>

          <ContentBody>
            <Description>
              <Label style={{ marginBottom: "16px" }}>About the role</Label>
              <HtmlWrapper>{parseSafeHTML(job.description)}</HtmlWrapper>
            </Description>
          </ContentBody>
        </ViewerContainer>
      </OuterWrapper>
    </ErrorBoundary>
  );
};

/* --- STYLES: Fixed Desktop Layout --- */

const OuterWrapper = styled.div`
  height: 100%;
  
  @media (min-width: 769px) {
    /* Anchors the section to the top and fills the viewport height */
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
  }
`;

const ViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg-black);
  
  @media (min-width: 769px) {
    /* Internal scrolling for the whole component */
    overflow-y: auto;
    padding: 40px;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Header = styled.div`
  padding: 0 0 32px 0;
  border-bottom: 1px solid var(--border-main);
`;

const Title = styled.h1`
  font-size: var(--font-lg, 20px);
  font-weight: 800;
  color: var(--text-white);
  margin-bottom: 24px;
  line-height: 1.3;
`;

const ContentBody = styled.div`
  padding: 32px 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
`;

const InfoItem = styled.div``;

const Label = styled.p`
  font-size: var(--font-xs, 13px);
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 6px;
  letter-spacing: 0.5px;
`;

const Value = styled.p`
  font-size: var(--font-sm, 14px);
  font-weight: 500;
  color: var(--text-sub);
`;

const Description = styled.div``;

const HtmlWrapper = styled.div`
  font-size: var(--font-sm, 14px);
  line-height: 1.8;
  color: var(--text-main);

  p { margin-bottom: 20px; }
  strong, b { color: var(--text-white); font-weight: 700; }
  ul, ol { padding-left: 20px; margin-bottom: 20px; }
  li { margin-bottom: 8px; }
  a { color: var(--text-link); text-decoration: none; &:hover { text-decoration: underline; } }
  h1, h2, h3 { color: var(--text-white); margin: 24px 0 16px 0; font-size: var(--font-xm, 17px); }
`;