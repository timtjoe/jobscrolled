import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

const Box = styled.div<{ $h?: string; $w?: string }>`
  background: #eee;
  height: ${p => p.$h || "1rem"};
  width: ${p => p.$w || "100%"};
  border-radius: 4px;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const Item = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const JobSkeleton = ({ count = 6 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <Item key={i}>
        <Box $h="14px" $w="70%" />
        <Box $h="12px" $w="40%" />
      </Item>
    ))}
  </>
);