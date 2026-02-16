import React, { useState } from "react";
import { NavLink } from "react-router";
import styled from "styled-components";
import type { JobContract } from "@/types/jobs";
import { formatCompactNumber, getLogoTheme } from "../utils";

interface JobCardProps {
  job: JobContract;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  // Track if the image fails to load
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
            <Dot>•</Dot>
            <Location>{job.location || "Global"}</Location>
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
  transition: background 0.15s ease;

  &:hover {
    background: var(--bg-dark);
  }
  &.active {
    background: var(--bg-accent);
    box-shadow: inset 4px 0 0 0 var(--bg-primary);
    h3 {
      color: var(--text-white);
    }
  }
`;

const Item = styled.div`
  display: flex;
  gap: 14px;
  padding: 16px 20px;
`;

const LogoWrap = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  object-fit: cover;
  border: 1px solid var(--border-main);
  background: white; /* Helpful for transparent PNG logos */
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  color: var(--text-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 16px;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Title = styled.h3`
  font-size: 14px;
  line-height: 16px;
  font-weight: 700;
  color: var(--text-sub);
  margin-bottom: 2px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  text-wrap: wrap;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 16px;
  color: var(--text-muted);
  width: 100%;
`;

const CompanyName = styled.span`
  color: var(--text-sub);
  font-weight: 500;
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
  font-size: 12px;
  line-height: 16px;
  margin-top: 2px;
  color: var(--text-muted);

  .salary {
    font-weight: 600;
  }
`;

const WorkBadge = styled.span<{ $isRemote: boolean }>`
  color: ${(p) => (p.$isRemote ? "var(--text-link)" : "var(--text-muted)")};
  font-weight: 600;
`;

const Dot = styled.span`
  margin: 0 6px;
  color: var(--border-dim);
  font-size: 10px;
  flex-shrink: 0;
`;
