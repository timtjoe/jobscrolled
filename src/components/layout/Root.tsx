// components/layout/Root.tsx
import React from "react";
import { Outlet } from "react-router";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// 1. Create the client outside the component to prevent recreation on re-renders
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Best practice: don't refetch on window focus for job boards 
      // to avoid hitting API rate limits unnecessarily
      refetchOnWindowFocus: false, 
      retry: 1,
    },
  },
});

export const Root: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        {/* All feature routes render inside this Outlet and share the cache */}
        <Outlet />
      </AppWrapper>
      
      {/* Devtools are a lifesaver for debugging your 4 API responses */}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

const AppWrapper = styled.div`
  min-height: 100vh;
  font-family: 'Inter', system-ui, sans-serif;
`;