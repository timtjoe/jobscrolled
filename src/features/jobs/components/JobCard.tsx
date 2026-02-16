import React, { useState } from "react";
import { NavLink } from "react-router";
import styled from "styled-components";
import type { JobContract } from "@/types/jobs";
import { formatCompactNumber, getLogoTheme } from "../utils";

interface JobCardProps {
  job: JobContract;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [imgError, setImgError] = useState(false);

  const companyName = job?.company || "Unknown Company";
  const firstLetter = companyName.charAt(0).toUpperCase();
  const brandBg = getLogoTheme(companyName);

  const salary = job?.salary;
  const salaryDisplay =
    salary?.min && salary?.max
      ? `${formatCompactNumber(salary.min)} - ${formatCompactNumber(salary.max)} ${salary.currency || "USD"}`
      : "Competitive Salary";

  return (
    <Card to={`/jobs/${job.id}`}>
      <Item>
        <LogoWrap>
          {job.logo && !imgError ? (
            <Logo src={job.logo} alt="" onError={() => setImgError(true)} />
          ) : (
            <Placeholder style={{ backgroundColor: brandBg }}>
              {firstLetter}
            </Placeholder>
          )}
        </LogoWrap>

        <Content>
          <Title>{job.title || "Untitled Position"}</Title>

          <MetaRow>
            <CompanyName>{companyName}</CompanyName> 
            <Location>, {job.location || "Global"}</Location>
          </MetaRow>

          <PerksRow>
            <WorkBadge $isRemote={!!job.isRemote}>
              {job.isRemote ? "Remote" : "On-site"}
            </WorkBadge>
            <Dot>•</Dot>
            <span className="salary">{salaryDisplay}</span>
          </PerksRow>
        </Content>
      </Item>
    </Card>
  );
};

/* --- STYLES --- */

const Card = styled(NavLink)`
  min-height: 100px;
  text-decoration: none;
  display: block;
  background: var(--bg-black);
  border-bottom: 1px solid var(--border-dim);
  transition: background-color 0.15s ease;

  &:hover {
    background-color: var(--bg-dark);
  }
  &.active {
    background: var(--bg-accent);
    h3 {
      color: var(--text-white);
    }
  }
`;

const Item = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
`;

const LogoWrap = styled.div`
  width: 41px;
  height: 39px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 2px;
  font-weight: 700;
  font-size: 30px;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: var(--bg-accent);
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 2px;
  color: var(--text-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: var(--font-xl);
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
`;

const Title = styled.h3`
  font-size: var(--font-sm);
  line-height: 16px;
  font-weight: 700;
  color: var(--text-sub);
  margin-bottom: 2px;
  letter-spacing: 0.06em;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-xs);
  line-height: 20px;
  color: var(--text-muted);
  width: 100%;
  overflow: hidden;
`;

const CompanyName = styled.span`
  color: var(--text-sub);
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
`;

const Location = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

const PerksRow = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-xs);
  line-height: 16px;
  margin-top: 2px;
  color: var(--text-muted);

  width: 100%;
  overflow: hidden;

  .salary {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }
`;

const WorkBadge = styled.span<{ $isRemote: boolean }>`
  color: ${(p) => (p.$isRemote ? "var(--text-muted)" : "var(--text-muted)")};
`;

const Dot = styled.span`
  margin: 0 6px;
  color: var(--border-dim);
  font-size: 10px;
  flex-shrink: 0;
`;
