// components/layout/PublicLayout.tsx
import React from "react";
import { NavLink, Outlet } from "react-router";
import styled from "styled-components";
import logo from "/logo.svg";

export const PublicLayout: React.FC = () => {
  return (
    <>
      <Navbar>
        <Logo src={logo} />
        <Links>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
        </Links>
      </Navbar>
      <Main>
        <Outlet /> {/* This will render the Homepage or About content */}
      </Main>
      <Footer>...</Footer>
    </>
  );
};

// Styled components at bottom as requested...
const Navbar = styled.nav` /* styling */ `;
const Main = styled.main` padding: 20px; `;
const Footer = styled.footer` /* styling */ `;
const Logo = styled.img` height: 30px; `;
const Links = styled.div` display: flex; gap: 10px; `;