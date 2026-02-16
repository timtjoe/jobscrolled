import React, { useMemo } from "react";
import { NavLink } from "react-router"; 
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
                <HashTag key={i}>#{tag.toLowerCase()}</HashTag>
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

/* --- STYLES: Using Custom Palette --- */

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  display: block;
  color: inherit;
  background: var(--bg-black);
  border-bottom: 1px solid var(--border-dim);

  &.active {
    background: var(--bg-accent);
    /* Adding a subtle glow effect with your primary blue */
    box-shadow: inset 4px 0 0 0 var(--bg-primary);

    .chevron {
      display: none;
    }
    
    h3 {
      color: var(--text-white);
    }
  }
`;

const ItemContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 20px 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: var(--bg-dark);
    
    .chevron {
      opacity: 1;
      transform: translateX(4px);
    }
  }
`;

const LogoContainer = styled.div`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid var(--border-main);
`;

const LogoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: var(--bg-dark);
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  border: 1px solid var(--border-main);
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
  font-size: 15px;
  font-weight: 700;
  color: var(--text-sub);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.2s;
`;

const SourceTag = styled.span`
  font-size: 9px;
  font-weight: 800;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  background: var(--bg-dark);
  padding: 2px 6px;
  border-radius: 4px;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 10px;
`;

const CompanyName = styled.span`
  font-weight: 500;
  color: var(--text-sub);
`;

const Separator = styled.span`
  color: var(--border-dim);
`;

const Location = styled.span`
  color: var(--text-muted);
`;

const RemoteBadge = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: var(--bg-primary);
  background: var(--bg-accent);
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: 4px;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const HashTag = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: var(--text-lavender);
  background: rgba(158, 158, 255, 0.1);
  padding: 1px 4px;
  border-radius: 4px;
`;

const ChevronIcon = styled.div`
  align-self: center;
  color: var(--text-muted);
  opacity: 0;
  transition: all 0.2s;
`;