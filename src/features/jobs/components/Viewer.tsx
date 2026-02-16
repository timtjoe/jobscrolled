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
    });

    return parse(sanitized);
  };

  return (
    <ErrorBoundary
      fallback={<TechnicalError onRetry={() => window.location.reload()} />}
    >
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
    </ErrorBoundary>
  );
};

// Styles remain the same as your previous version
const ViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
`;
const Header = styled.div`
  padding: 0 0 32px 0;
  border-bottom: 1px solid var(--border);
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: var(--black);
  margin-bottom: 24px;
  line-height: 1.2;
`;
const ContentBody = styled.div`
  flex: 1;
  padding: 32px 0;
  overflow-y: auto;
`;
const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
`;
const InfoItem = styled.div``;
const Label = styled.p`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 6px;
  letter-spacing: 0.5px;
`;
const Value = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: var(--black);
`;
const Description = styled.div``;
const HtmlWrapper = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: #374151;
  p {
    margin-bottom: 20px;
  }
`;
