import React from "react";
import styled from "styled-components";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <IntroSection>
        <Heading>About the Project</Heading>
        <Description>
          Hi, I'm <strong>Tim</strong>. I built this platform as part of my
          portfolio. I'm <strong>open to offers</strong> for Remote Frontend or
          Full-Stack roles where UI excellence is the priority.
        </Description>

        <ContactLinks>
          <Link href="mailto:timtjoe@gmail.com">Email</Link>
          <Dot>•</Dot>
          <Link href="https://wa.me/231770934646" target="_blank">
            WhatsApp
          </Link>
          <Dot>•</Dot>
          <Link href="https://github.com/timtjoe" target="_blank">
            GitHub
          </Link>
        </ContactLinks>
      </IntroSection>

      <Divider />

      <CopyrightSection>© {currentYear} Tim T. Joe</CopyrightSection>
    </FooterContainer>
  );
};

/* --- STYLES --- */

const FooterContainer = styled.footer`
  padding: 20px;
  background: var(--bg-dark); /* Contrast background */
  border-radius: 12px;
  margin: 16px;
  display: flex;
  flex-direction: column;
`;

const IntroSection = styled.div`
  margin-bottom: 16px;
`;

const Heading = styled.h4`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-sub);
  margin-bottom: 12px;

  strong {
    color: var(--text-white);
    font-weight: 600;
  }
`;

const ContactLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
`;

const Link = styled.a`
  color: var(--text-link);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const Dot = styled.span`
  color: var(--text-muted);
  font-size: 10px;
  opacity: 0.5;
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid var(--border-dim);
  margin: 0 0 12px 0;
  opacity: 0.3;
`;

const CopyrightSection = styled.div`
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 500;
`;
