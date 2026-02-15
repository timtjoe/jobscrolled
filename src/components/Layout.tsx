import React from "react";
import { Outlet } from "react-router";
import styled from "styled-components";

export const Layout: React.FC = () => {
  return (
    <Container>
      <Pane>Left Column</Pane>
      <Main>
        <Outlet />
      </Main>
      <Sidebar>Right Column</Sidebar>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 380px 1fr 300px;
  max-width: 1200px;
  height: 100vh;
  margin: 0 auto;
  overflow: hidden;
  background-color: #ffffff;
`;

const Pane = styled.aside`
  border: 1px solid green;
`;

const Main = styled.main`
  overflow-y: auto;
  /* Glass effect header can be implemented inside child pages */
`;

const Sidebar = styled.aside`
  border: 1px solid red;
  overflow-y: auto;
`;
