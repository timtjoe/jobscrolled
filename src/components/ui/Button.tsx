import styled, { css } from "styled-components";

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 700;
  font-size: var(--font-md);
  line-height: 20px;
  border-radius: 100px;
  border: 1px solid transparent;

  &:active { transform: scale(0.96); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }

  /* Variants */
  &.primary {
    background: var(--bg-primary);
    color: var(--text-white);
    &:hover { filter: brightness(1.1); }
  }

  &.secondary {
    background: var(--bg-dark);
    color: var(--text-white);
    border-color: var(--border-main);
    &:hover { background: var(--border-dim); }
  }

  &.outlined {
    background: transparent;
    color: var(--text-white);
    border-color: var(--border-light);
    &:hover { background: var(--bg-accent); }
  }

  /* Sizes */
  &.small {
    font-size: var(--font-xs);
    padding: 6px 14px;
  }
  
  &.large {
    font-size: var(--font-lg);
    padding: 12px 28px;
  }

  /* Default/Medium padding */
  padding: 8px 20px;
`;