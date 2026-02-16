import React from "react";
import styled from "styled-components";
import { Icons } from "@/components/icons";
import type { JobContract } from "@/types/jobs";

export const Company: React.FC<{ details: JobContract }> = ({ details }) => {
  return (
    <Container>
      <Circle>
        {details.logo ? (
          <img src={details.logo} alt="" />
        ) : (
          details.company.charAt(0)
        )}
      </Circle>

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Name>{details.company}</Name>
        <Meta>
          <Icons.map_pin size={14} /> {details.location}
        </Meta>
        <Meta>
          <Icons.briefcase size={14} /> {details.isRemote ? "Remote" : "On-site"}
        </Meta>
      </div>

      <Footer>
        <Btn onClick={() => window.open(details.url, "_blank", "noopener,noreferrer")}>
          Apply Now <Icons.external size={14} />
        </Btn>
        <Source>via {details.source}</Source>
      </Footer>
    </Container>
  );
};

const Container = styled.aside`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
  background: var(--bg-black);
  color: var(--text-muted);
`;

const Circle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 16px;
  border: 1px solid var(--border-main);
  background: var(--bg-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 800;
  color: var(--text-white);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: white;
    padding: 4px;
  }
`;

const Name = styled.h2`
  font-size: var(--font-xm, 17px);
  color: var(--text-white);
  margin: 0 0 8px;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: var(--font-sm, 14px);
  margin-top: 4px;
`;

const Footer = styled.div`
  width: 100%;
  padding-top: 16px;
  border-top: 1px solid var(--border-dim);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const Btn = styled.button`
  background: var(--bg-primary);
  color: var(--text-white);
  padding: 8px 20px;
  border-radius: 20px;
  font-size: var(--font-xs, 13px);
  font-weight: 600;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover { filter: brightness(1.1); }
  &:active { transform: scale(0.96); }
`;

const Source = styled.span`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;