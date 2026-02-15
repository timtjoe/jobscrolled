import React from 'react';
import { toast } from 'sonner';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import { ErrorBoundary } from '@/components/errors';
import { TechnicalError } from '@/components/errors';
import { Icons } from '@/components/icons';
import type { JobContract } from '../job.types';

interface JobDetailModalProps {
  job: JobContract;
}

const JobDetailModalContent: React.FC<JobDetailModalProps> = ({ job }) => {
  const handleApply = () => {
    toast.dismiss();
    window.open(job.url, '_blank', 'noopener,noreferrer');
  };

  const parseSafeHTML = (html: string) => {
    const cleanHtml = html
      .replace(/Please mention the word.*$/i, '')
      .replace(/#\w+=/g, '')
      .replace(/\u00e2/g, '');
    
    const sanitized = DOMPurify.sanitize(cleanHtml, {
      ALLOWED_TAGS: ['p', 'strong', 'em', 'b', 'i', 'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3', 'br'],
      ALLOWED_ATTR: ['href']
    });
    
    return parse(sanitized);
  };

  return (
    <ErrorBoundary 
      fallback={
        <TechnicalError 
          message="Failed to load job details."
          onRetry={() => toast.dismiss()}
        />
      }
    >
      <ModalContent>
        <Header>
          <TitleGroup>
            <JobTitle>{job.title}</JobTitle>
            {job.isRemote && <RemotePill>🗺️ Remote</RemotePill>}
          </TitleGroup>
          <CloseBtn onClick={() => toast.dismiss()} title="Close modal">
            <Icons.close size={18} />
          </CloseBtn>
        </Header>

        <Body>
          <MetaGrid>
            <MetaItem><Label>Company</Label><Value>{job.company}</Value></MetaItem>
            <MetaItem><Label>Location</Label><Value>{job.location}</Value></MetaItem>
            <MetaItem><Label>Source</Label><Value>{job.source}</Value></MetaItem>
          </MetaGrid>

          {job.logo && <Logo src={job.logo} alt={job.company} />}
          
          {job.salary && (
            <SalaryCard>
              <Label>Salary</Label>
              <SalaryValue>${job.salary.min || 'TBD'} - ${job.salary.max || 'TBD'}</SalaryValue>
            </SalaryCard>
          )}

          {job.type && (
            <TypeCard>
              <Label>Type</Label>
              <Value>{Array.isArray(job.type) ? job.type.join(', ') : job.type}</Value>
            </TypeCard>
          )}

          <DescriptionSection>
            <Label>Description</Label>
            <JobDescription>{parseSafeHTML(job.description)}</JobDescription>
          </DescriptionSection>
        </Body>

        <Footer>
          <ApplyBtn onClick={handleApply}>
            <Icons.external size={18} />
            Apply Now
          </ApplyBtn>
        </Footer>
      </ModalContent>
    </ErrorBoundary>
  );
};

export default JobDetailModalContent;

// ============================================
// STYLES - ALL AT BOTTOM (FIXED)
// ============================================

import styled, { keyframes } from 'styled-components';

// ✅ FIXED: Import styled-components keyframes at top of styles section
const slideIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 16px;
  max-height: 90vh;
  max-width: 600px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
`;

const Header = styled.div`
  padding: 24px;
  border-bottom: 1px solid #f0f4f8;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`;

const TitleGroup = styled.div` flex: 1; `;

const JobTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const RemotePill = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s ease;
  &:hover { background: #f9fafb; }
  &:active { transform: scale(0.97); }
`;

const Body = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  scrollbar-width: thin;
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
`;

const MetaItem = styled.div``;

const Label = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
`;

const Value = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
`;

const Logo = styled.img`
  display: block;
  margin: 24px auto;
  max-height: 64px;
  width: auto;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
`;

const SalaryCard = styled.div`
  background: linear-gradient(135deg, #fef7ff, #fdf2f8);
  padding: 20px;
  border-radius: 12px;
  margin: 20px 0;
  border: 1px solid #fce7f3;
`;

const SalaryValue = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: #7c3aed;
  margin-top: 6px;
`;

const TypeCard = styled.div`
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  padding: 16px 20px;
  border-radius: 12px;
  margin: 16px 0;
`;

const DescriptionSection = styled.div`
  margin-top: 24px;
`;

const JobDescription = styled.div`
  line-height: 1.7;
  color: #374151;
  font-size: 1rem;
  p { margin-bottom: 1rem; }
  ul, ol { padding-left: 1.5rem; margin: 1rem 0; }
  li { margin-bottom: 0.5rem; }
  strong { font-weight: 600; color: #111827; }
  a {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
    &:hover { text-decoration: underline; }
  }
`;

const Footer = styled.div`
  padding: 24px;
  border-top: 1px solid #f0f4f8;
`;

const ApplyBtn = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
  }
  &:active { transform: translateY(0) scale(0.98); }
`;
