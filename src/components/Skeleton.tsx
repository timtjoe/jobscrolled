import React from "react";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

/* Common Base Component */
const SkeletonBase = styled.div<{ $h?: string; $w?: string; $m?: string }>`
  background: var(--bg-dark);
  height: ${(p) => p.$h || "1rem"};
  width: ${(p) => p.$w || "100%"};
  margin: ${(p) => p.$m || "0"};
  border-radius: var(--radius-sm, 4px);
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

/* --- Job List Skeleton --- */
const JobItem = styled.div`
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--spacing-sm);
  min-height: 100px;
`;

export const JobSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <JobItem key={i}>
        <SkeletonBase $h="16px" $w="60%" />
        <SkeletonBase $h="12px" $w="35%" />
        <SkeletonBase $h="12px" $w="80%" />
      </JobItem>
    ))}
  </>
);

/* --- Job Viewer Skeleton --- */
const ViewerRoot = styled.div`
  padding: 40px;
  background: var(--bg-black);
  .head {
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border-dim);
  }
  .body {
    padding-top: 32px;
  }
  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

export const ViewerSkeleton: React.FC = () => (
  <ViewerRoot>
    <div className="head">
      <SkeletonBase $h="24px" $w="60%" $m="0 0 8px 0" />
      <SkeletonBase $h="14px" $w="30%" $m="0 0 16px 0" />
      <div style={{ display: "flex", gap: "12px" }}>
        <SkeletonBase $h="14px" $w="80px" />
        <SkeletonBase $h="14px" $w="80px" />
      </div>
    </div>
    <div className="body">
      <SkeletonBase $h="20px" $w="40%" $m="0 0 20px 0" />
      {[100, 100, 85, 90].map((w, i) => (
        <SkeletonBase key={i} $h="14px" $w={`${w}%`} $m="0 0 12px 0" />
      ))}
      <div style={{ marginTop: "28px" }}>
        <SkeletonBase $h="14px" $w="100%" $m="0 0 12px 0" />
        <SkeletonBase $h="14px" $w="70%" />
      </div>
    </div>
  </ViewerRoot>
);

/* Add this to your existing skeleton file where JobSkeleton and ViewerSkeleton are */

export const SuggestionsSkeleton: React.FC<{ count?: number }> = ({
  count = 3,
}) => (
  <div
    style={{
      padding: "24px 0",
      marginTop: "10px",
      borderTop: "1px solid var(--border-dim)",
    }}
  >
    <SkeletonBase $h="12px" $w="100px" $m="0 24px 16px" /> {/* Title */}
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "10px 24px",
        }}
      >
        <SkeletonBase $h="32px" $w="32px" style={{ borderRadius: "6px" }} />{" "}
        {/* Logo */}
        <div style={{ flex: 1 }}>
          <SkeletonBase $h="13px" $w="80%" $m="0 0 6px 0" /> {/* Job Title */}
          <SkeletonBase $h="11px" $w="40%" /> {/* Category */}
        </div>
      </div>
    ))}
  </div>
);

/* --- Sidebar Skeleton (Company + Suggestions) --- */
export const SidebarSkeleton: React.FC = () => (
  <div style={{ width: "100%", background: "var(--bg-black)" }}>
    {/* Company Cover Placeholder */}
    <SkeletonBase $h="100px" style={{ opacity: 0.3 }} />
    
    <div style={{ padding: "0 24px 24px", marginTop: "-40px" }}>
      {/* Company Circle Avatar */}
      <SkeletonBase $h="80px" $w="80px" style={{ borderRadius: "12px", border: "4px solid var(--bg-black)" }} />
      
      {/* Company Info */}
      <div style={{ marginTop: "16px" }}>
        <SkeletonBase $h="20px" $w="70%" $m="0 0 8px 0" />
        <SkeletonBase $h="14px" $w="40%" $m="0 0 12px 0" />
        <SkeletonBase $h="14px" $w="30%" />
      </div>
    </div>

    {/* Footer/Apply Button Placeholder */}
    <div style={{ padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <SkeletonBase $h="10px" $w="60px" />
      <SkeletonBase $h="36px" $w="80px" style={{ borderRadius: "6px" }} />
    </div>

    {/* Suggestions List */}
    <SuggestionsSkeleton count={3} />
  </div>
);