import React from "react";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

const Box = styled.div<{ $h?: string; $w?: string }>`
  /* Using root variables for skeleton color */
  background: var(--bg-dark); 
  height: ${p => p.$h || "1rem"};
  width: ${p => p.$w || "100%"};
  border-radius: var(--radius-sm);
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const Item = styled.div`
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--spacing-sm);
  
  /* Requirements: Min-height 100px and no bottom border */
  min-height: 100px;
  border-bottom: none; 
`;

interface SkeletonProps {
  count?: number;
}

export const JobSkeleton: React.FC<SkeletonProps> = ({ count = 5 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <Item key={i}>
        {/* Title Placeholder */}
        <Box $h="16px" $w="60%" />
        {/* Subtitle/Meta Placeholder */}
        <Box $h="12px" $w="35%" />
        {/* Brief Description Placeholder */}
        <Box $h="12px" $w="80%" />
      </Item>
    ))}
  </>
);