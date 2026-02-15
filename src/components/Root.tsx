import React from "react";
import { Outlet } from "react-router";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, 
      retry: 1,
    },
  },
});

export const Root: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <Outlet />
      </AppWrapper>
    </QueryClientProvider>
  );
};

const AppWrapper = styled.div`
  min-height: 100vh;
  font-family: 'Inter', system-ui, sans-serif;
`;