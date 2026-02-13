import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const SkeletonBase = styled.div`
  background: #eee;
  background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
`;

const SkeletonTitle = styled(SkeletonBase)`
  height: 1.1rem;
  width: 60%;
`;

const SkeletonMeta = styled(SkeletonBase)`
  height: 0.8rem;
  width: 40%;
`;

export const JobSkeleton = ({ count = 5 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <ItemWrapper key={i}>
        <SkeletonTitle />
        <SkeletonMeta />
      </ItemWrapper>
    ))}
  </>
);