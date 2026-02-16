import React, { useState } from "react";
import styled from "styled-components";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui";
import type { JobContract } from "@/types/jobs";
import { getLogoTheme } from "../utils";

export const Company: React.FC<{ details: JobContract }> = ({ details }) => {
  const [imgError, setImgError] = useState(false);

  const onApply = () =>
    window.open(details.url, "_blank", "noopener,noreferrer");

  const companyName = details?.company || "Unknown";
  const brandColor = getLogoTheme(companyName);
  const firstLetter = companyName.charAt(0).toUpperCase();

  return (
    <Container>
      <Cover $bgColor={brandColor} />

      <ProfileSection>
        <Circle style={{ backgroundColor: brandColor }}>
          {details.logo && !imgError ? (
            <img src={details.logo} alt="" onError={() => setImgError(true)} />
          ) : (
            firstLetter
          )}
        </Circle>

        <InfoGroup>
          <Name>{companyName}</Name>
          <Location>{details.location}</Location>

          <MetaList>
            <MetaItem>
              <Icons.briefcase size={14} />
              {details.isRemote ? "Remote Friendly" : "On-site"}
            </MetaItem>
          </MetaList>
        </InfoGroup>
      </ProfileSection>

      <Footer>
        <Source>via {details.source}</Source>
        <Button className="primary" onClick={onApply}>
          Apply <Icons.external size={16} />
        </Button>
      </Footer>

      <BottomSpacer />
    </Container>
  );
};

/* --- STYLES --- */
const Container = styled.aside`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--bg-black);
  height: 100%;
`;

const Cover = styled.div<{ $bgColor: string }>`
  width: 100%;
  height: 100px;
  background: ${(props) => props.$bgColor};
  opacity: 0.7;
  background-image: linear-gradient(
    to bottom right,
    rgba(0, 0, 0, 0.2),
    transparent
  );
`;

const ProfileSection = styled.div`
  padding: 0 var(--spacing-lg) var(--spacing-lg);
  display: flex;
  flex-direction: column;
  margin-top: -40px;
`;

const Circle = styled.div`
  width: 80px;
  height: 78px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-dim);
  background: var(--bg-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  font-weight: 800;
  color: var(--text-white);
  overflow: hidden;
  margin-bottom: 16px;
  z-index: 100;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: var(--bg-black);
  }
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Name = styled.h2`
  font-size: var(--font-lg);
  line-height: 24px;
  font-weight: 700;
  color: var(--text-white);
  margin: 0;
`;

const Location = styled.p`
  font-size: var(--font-sm);
  color: var(--text-muted);
  line-height: 30px;
`;

const MetaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: var(--font-sm);
  color: var(--text-sub);

  svg {
    color: var(--text-muted);
  }
`;

const Footer = styled.div`
  width: 100%;
  padding: var(--spacing-sm);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  button {
    padding: 8px 16px;
    font-size: var(--font-xs);
    height: 36px;
    width: auto;
    width: 140px;
  }

  @media (max-width: 1024px) {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 16px 24px;
    background: var(--bg-overlay);
    backdrop-filter: blur(12px);
    z-index: 100;

    button {
      box-shadow: 0 4px 15px rgba(29, 155, 240, 0.2);
    }
  }
`;

const Source = styled.span`
  font-size: var(--font-xs);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  white-space: nowrap;
`;

const BottomSpacer = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: block;
    height: 26px;
  }
`;
