import type React from "react";
import { NavLink, Outlet } from "react-router";
import styled from "styled-components";
import logo from "/logo.svg";
import logo_sm from "/logo_sm.svg";

export const Root = (): React.JSX.Element => {
  return (
    <Container>
      <nav>
        <NavLink to="/">
          <picture>
            {/* If screen is 640px or wider, show the full logo */}
            <source srcSet={logo} media="(min-width: 640px)" />
            {/* Fallback/Default: show the small logo on mobile */}
            <LogoImg src={logo_sm} alt="Company Logo" />
          </picture>
        </NavLink> 
        | <NavLink to="/about"> About</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </Container>
  );
};

const LogoImg = styled.img`
  display: block;
  height: 40px; // Adjust based on your design
  width: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    flex: 1;
  }
`;