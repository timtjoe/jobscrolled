import React from "react";
import styled from "styled-components";
import { Icons } from "@/components/icons";
import type { JobContract } from "@/types/jobs";

interface IProps {
  details: JobContract;
}

export const Company: React.FC<IProps> = ({ details }) => {
  const handleApply = () => {
    window.open(details.url, "_blank", "noopener,noreferrer");
  };

  return (
    <Container>
      <Header>
        <Logo>
          {details.logo ? (
            <Image src={details.logo} alt={details.company} />
          ) : (
            <Fallback>{details.company.charAt(0)}</Fallback>
          )}
        </Logo>

        <Meta>
          <Name>{details.company}</Name>
          <Location>
            <Icons.map_pin size={12} />
            {details.location}
          </Location>
        </Meta>
      </Header>

      <Column>
        <Button onClick={handleApply}>
          Apply Now
          <Icons.external size={16} />
        </Button>
        <Text>via {details.source}</Text>
      </Column>
    </Container>
  );
};

// Styles remain the same
const Container = styled.div`
  padding: 24px;
  background: var(--surface);
  border-radius: 12px;
  border: 1px solid var(--border);
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;
const Logo = styled.div`
  width: 64px;
  height: 64px;
  flex-shrink: 0;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
  background: #fff;
  border: 1px solid var(--border);
`;
const Fallback = styled.div`
  width: 100%;
  height: 100%;
  background: var(--black);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  border-radius: 12px;
`;
const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Name = styled.h2`
  font-size: 18px;
  font-weight: 800;
  color: var(--black);
  margin: 0;
`;
const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--muted);
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Button = styled.button`
  width: 100%;
  background: var(--black);
  color: #fff;
  padding: 14px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
const Text = styled.span`
  font-size: 11px;
  text-align: center;
  color: var(--muted);
  font-weight: 600;
  text-transform: uppercase;
`;
