import React from "react";
import styled from "styled-components";

/**
 * Footer Component
 * Includes project-specific developer availability and personal branding.
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <OpportunitySection>
        <Heading>Open to Opportunities</Heading>
        <AvailabilityText>
          I am currently seeking <strong>Remote-first</strong> or <strong>Relocation-friendly</strong> Frontend 
          and Full-Stack Engineering roles where UI excellence is a priority. If you need a developer 
          to help your product stand out, let’s talk.
        </AvailabilityText>
        
        <ContactLinks>
          <Link href="mailto:timtjoe@gmail.com">Email</Link>
          <Dot>•</Dot>
          <Link href="https://wa.me/231770934646" target="_blank">WhatsApp</Link>
          <Dot>•</Dot>
          <Link href="https://github.com/timtjoe" target="_blank">GitHub</Link>
        </ContactLinks>
      </OpportunitySection>

      <Divider />

      <CopyrightSection>
        © {currentYear} Tim T. Joe. All rights reserved.
      </CopyrightSection>
    </FooterContainer>
  );
};

/* --- STYLES --- */

const FooterContainer = styled.footer`
  padding: 24px;
  background: var(--bg-black);
  margin-top: auto;
  display: flex;
  flex-direction: column;
`;

const OpportunitySection = styled.div`
  margin-bottom: 20px;
`;

const Heading = styled.h4`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: 10px;
`;

const AvailabilityText = styled.p`
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-sub);
  margin-bottom: 16px;

  strong {
    color: var(--text-main);
    font-weight: 600;
  }
`;

const ContactLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 13px;
`;

const Link = styled.a`
  color: var(--text-link);
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s ease;

  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

const Dot = styled.span`
  color: var(--border-dim);
  font-size: 10px;
  user-select: none;
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid var(--border-dim);
  margin: 0 0 16px 0;
  width: 100%;
`;

const CopyrightSection = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.02em;
`;