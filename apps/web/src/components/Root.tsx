import type React from "react";
import { Link, NavLink, Outlet } from "react-router";
import styled from "styled-components";

export const Root = (): React.JSX.Element => {
  return (
    <Container>
      <nav>
        <NavLink to="/">Home </NavLink> | <NavLink to="/about"> About</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    flex: 1;
  }
`;
