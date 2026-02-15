import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Icons } from '@/components/icons';
import type { JobContract } from '../job.types';
import { cleanAndExtractHashtags, cleanFirstLine } from '../job.utils';

interface JobCardProps extends React.HTMLAttributes<HTMLDivElement> {
  job: JobContract;
  handlers: {
    onJobClick: (job: JobContract) => void;
    onCompanyClick: (company: string) => void;
  };
}

export const JobCard: React.FC<JobCardProps> = ({ 
  job, 
  handlers,
  ...props 
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  const hashtags = React.useMemo(() => cleanAndExtractHashtags(job.description), [job.description]);
  const firstLine = React.useMemo(() => cleanFirstLine(job.description), [job.description]);

  const handleCompanyClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    handlers.onCompanyClick(job.company);
  }, [job.company, handlers.onCompanyClick]);

  const handleJobClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    handlers.onJobClick(job);
  }, [job, handlers.onJobClick]);

  const handleOptionsToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions(prev => !prev);
  }, []);

  const handleHide = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions(false);
    // Hide logic here
  }, []);

  const handleReport = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions(false);
    // Report logic here
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };
    if (showOptions) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showOptions]);

  return (
    <CardContainer onClick={handleJobClick} {...props}>
      <Header>
        <CompanySection onClick={handleCompanyClick}>
          <CompanyLogoContainer>
            {job.logo ? (
              <CompanyLogo src={job.logo} alt={job.company} />
            ) : (
              <NoLogo>📄</NoLogo>
            )}
          </CompanyLogoContainer>
          
          <CompanyDetails>
            <CompanyName>{job.company}</CompanyName>
            <Location>{job.location}</Location>
            {job.isRemote && <RemoteTag>Remote</RemoteTag>}
          </CompanyDetails>
        </CompanySection>
        
        <OptionsContainer>
          <OptionsBtn onClick={handleOptionsToggle} title="More options">
            <Icons.more_vertical size={18} />
          </OptionsBtn>
          
          {showOptions && (
            <OptionsDropdown ref={optionsRef}>
              <OptionItem onClick={handleHide}>
                <Icons.eye_off size={16} /> Hide
              </OptionItem>
              <OptionItem onClick={handleReport}>
                <Icons.flag size={16} /> Report
              </OptionItem>
            </OptionsDropdown>
          )}
        </OptionsContainer>
      </Header>

      <Description>{firstLine}</Description>

      {hashtags.length > 0 && (
        <Hashtags>
          {hashtags.map((tag, index) => (
            <Hashtag key={index}>{tag}</Hashtag>
          ))}
        </Hashtags>
      )}

      <Categories>
        <span>{job.source}</span>
        {job.type && (
          <>
            <MidDot>•</MidDot>
            <span>{Array.isArray(job.type) ? job.type[0] : job.type}</span>
          </>
        )}
      </Categories>

      <Footer>
        <ActionBtn title="Share job" aria-label="Share this job">
          <Icons.share size={16} />
        </ActionBtn>
        <LoveBtn title="Love this job" aria-label="Love this job">
          <Icons.heart size={16} />
        </LoveBtn>
      </Footer>
    </CardContainer>
  );
};

// ============================================
// STYLES (unchanged - same as previous)
// ============================================

const CardContainer = styled.div`
  background: var(--bg-white);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-color: var(--border-subtle);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
`;

const CompanySection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  flex: 1;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover { opacity: 0.8; }
`;

const CompanyLogoContainer = styled.div`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CompanyLogo = styled.img`
  width: 100%;
  height: 100%;
  border-radius: var(--radius-sm);
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const NoLogo = styled.div`
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  background: var(--bg-grey);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--text-muted);
`;

const CompanyDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const CompanyName = styled.div`
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--text-black);
  margin-bottom: var(--spacing-xs);
  line-height: 1.3;
`;

const Location = styled.div`
  font-size: var(--font-sm);
  color: var(--text-muted);
  margin-bottom: var(--spacing-xs);
`;

const RemoteTag = styled.span`
  font-size: var(--font-xs);
  font-weight: 600;
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
`;

const OptionsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const OptionsBtn = styled.button`
  background: none;
  border: none;
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  color: var(--text-grey);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.15s ease;
  
  &:hover {
    background: var(--bg-grey);
    color: var(--text-black);
  }
`;

const OptionsDropdown = styled.div`
  position: absolute;
  top: calc(100% + var(--spacing-xs));
  right: 0;
  background: var(--bg-white);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  min-width: 140px;
  z-index: 100;
`;

const OptionItem = styled.div`
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-sm);
  color: var(--text-black);
  cursor: pointer;
  transition: background 0.15s ease;
  
  &:hover { background: var(--bg-grey); }
`;

const Description = styled.div`
  font-size: var(--font-sm);
  color: var(--text-black);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Hashtags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
`;

const Hashtag = styled.span`
  font-size: var(--font-xs);
  color: var(--text-muted);
  font-weight: 500;
`;

const Categories = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-xs);
  color: var(--text-grey);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-lg);
`;

const MidDot = styled.span`
  color: var(--text-muted);
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
`;

const ActionBtn = styled.button`
  background: none;
  border: 1px solid var(--border-subtle);
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  width: 40px;
  height: 40px;
  
  &:hover {
    background: var(--bg-grey);
    border-color: var(--border-light);
    color: var(--text-black);
  }
`;

const LoveBtn = styled.button`
  background: none;
  border: none;
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  width: 40px;
  height: 40px;
  
  &:hover {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
  }
`;
