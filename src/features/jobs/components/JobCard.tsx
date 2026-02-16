import React, { useMemo } from "react";
import { NavLink } from "react-router"; // Use NavLink for automatic 'active' class
import styled from "styled-components";
import { Icons } from "@/components/icons";
import type { JobContract } from "@/types/jobs";
import { cleanAndExtractHashtags } from "../utils";

interface JobCardProps {
  job: JobContract;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const hashtags = useMemo(
    () => cleanAndExtractHashtags(job.description),
    [job.description],
  );

  return (
    <StyledNavLink to={`/jobs/${job.id}`}>
      <ItemContainer>
        <LogoContainer>
          {job.logo ? (
            <Logo src={job.logo} alt={job.company} />
          ) : (
            <LogoPlaceholder>{job.company.charAt(0)}</LogoPlaceholder>
          )}
        </LogoContainer>

        <Content>
          <TopRow>
            <Title>{job.title}</Title>
            <SourceTag>{job.source}</SourceTag>
          </TopRow>

          <MetaRow>
            <CompanyName>{job.company}</CompanyName>
            <Separator>•</Separator>
            <Location>{job.location}</Location>
            {job.isRemote && <RemoteBadge>Remote</RemoteBadge>}
          </MetaRow>

          {hashtags.length > 0 && (
            <TagList>
              {hashtags.slice(0, 3).map((tag, i) => (
                <HashTag key={i}>{tag.toLowerCase()}</HashTag>
              ))}
            </TagList>
          )}
        </Content>

        <ChevronIcon className="chevron">
          <Icons.arrow_right size={14} />
        </ChevronIcon>
      </ItemContainer>
    </StyledNavLink>
  );
};

/* --- STYLES --- */

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  display: block;
  color: inherit;
  border-bottom: 1px solid var(--border, #eee);

  // Active state when the URL matches this job ID
  &.active {
    background: var(--surface-active, #f0f7ff);
    border-left: 4px solid var(--primary, #007bff);

    // Hide chevron when active to keep it clean
    .chevron {
      display: none;
    }
  }
`;

const ItemContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 20px 24px;
  cursor: pointer;
  transition: background 0.15s ease;
  position: relative;

  &:hover {
    background: var(--surface, #f9fafb);
  }
`;

const LogoContainer = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  object-fit: cover;
`;

const LogoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background: var(--surface, #f0f0f0);
  color: var(--muted, #666);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  border: 1px solid var(--border, #eee);
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
`;

const Title = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: var(--black, #111);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SourceTag = styled.span`
  font-size: 9px;
  font-weight: 800;
  color: var(--muted, #999);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--muted, #666);
  margin-bottom: 8px;
`;

const CompanyName = styled.span`
  font-weight: 500;
`;

const Separator = styled.span`
  color: var(--border, #eee);
`;

const Location = styled.span`
  color: var(--grey, #888);
`;

const RemoteBadge = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  padding: 1px 6px;
  border-radius: 4px;
  margin-left: 4px;
`;

const TagList = styled.div`
  display: flex;
  gap: 8px;
`;

const HashTag = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: var(--primary, #007bff);
  opacity: 0.8;
`;

const ChevronIcon = styled.div`
  align-self: center;
  color: var(--border, #ccc);
  opacity: 0;
  transition: opacity 0.2s;
  ${ItemContainer}:hover & {
    opacity: 1;
  }
`;
