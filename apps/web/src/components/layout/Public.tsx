// components/layout/PublicLayout.tsx
import React from "react";
import { Outlet } from "react-router";
import styled from "styled-components";
import { AppBar } from "./AppBar";

export const PublicLayout: React.FC = () => {
  return (
    <Wrapper>
      <AppBar />
      <Main>
        <Outlet />
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  /* Avoid 'overflow: hidden' here as it breaks position: sticky */
`;
