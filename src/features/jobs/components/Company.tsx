import React, { useState } from "react";
import styled from "styled-components";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui";
import type { JobContract } from "@/types/jobs";
import { getLogoTheme } from "../utils";

export const Company: React.FC<{ details: JobContract }> = ({ details }) => {
  const [imgError, setImgError] = useState(false);
  
  const onApply = () => window.open(details.url, "_blank", "noopener,noreferrer");
  
  const companyName = details?.company || "Unknown";
  const brandColor = getLogoTheme(companyName);
  const firstLetter = companyName.charAt(0).toUpperCase();

  return (
    <Container>
      <Cover $bgColor={brandColor} />

      <ProfileSection>
        <Circle style={{ backgroundColor: brandColor }}>
          {details.logo && !imgError ? (
            <img 
              src={details.logo} 
              alt="" 
              onError={() => setImgError(true)} 
            />
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
          Apply <Icons.external size={12} />
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
  background: ${props => props.$bgColor};
  opacity: 0.6;
  background-image: linear-gradient(to bottom right, rgba(0,0,0,0.2), transparent);
`;

const ProfileSection = styled.div`
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  margin-top: -40px;
`;

const Circle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: var(--radius, 12px);
  border: 4px solid var(--bg-black);
  background: var(--bg-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 800;
  color: var(--text-white);
  overflow: hidden;
  margin-bottom: 16px;
  
  img { 
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
    background: white; 
    padding: 4px; 
  }
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Name = styled.h2`
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  color: var(--text-white);
  margin: 0;
`;

const Location = styled.p`
  font-size: 14px;
  color: var(--text-muted);
  margin: 0 0 12px 0;
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
  font-size: 13px;
  color: var(--text-sub);
  
  svg {
    color: var(--text-muted);
  }
`;

const Footer = styled.div`
  width: 100%;
  /* margin-top: auto; */
  padding: 24px;
  /* Removed border-top */
  display: flex;
  flex-direction: row; /* Unified row layout */
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  button {
    padding: 8px 16px; /* Smaller button */
    font-size: 13px;
    height: 36px;
    width: auto;
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
  font-size: 10px;
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
    height: 80px;
  }
`;