import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Icons } from "@/components/icons";

interface ITechnicalError {
  message?: string;
  onRetry?: () => void;
  autoRetrySeconds?: number;
}

export const TechnicalError = ({
  message = "Technical error occurred.",
  onRetry,
  autoRetrySeconds = 5,
}: ITechnicalError): React.JSX.Element => {
  const [secondsLeft, setSecondsLeft] = useState(autoRetrySeconds);
  const isRetrying = secondsLeft <= 0;

  useEffect(() => {
    if (!onRetry || secondsLeft < 0) return;

    if (secondsLeft === 0) {
      onRetry();
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, onRetry]);

  return (
    <Container>
      <Row>
        <StatusIcon>
          {isRetrying ? (
            <Icons.refresh size={16} color="var(--text-black)" />
          ) : (
            <Icons.circle size={16} color="var(--text-red)" strokeWidth={2.5} />
          )}
        </StatusIcon>

        <ErrorMessage>
          {isRetrying ? "Attempting to reconnect..." : message}
        </ErrorMessage>

        {onRetry && !isRetrying && (
          <CountdownText>
            (Retrying in <strong>{secondsLeft}s</strong>)
          </CountdownText>
        )}
      </Row>
    </Container>
  );
};

/* --- Styled Components (Aligned with RootCSS) --- */

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg) 0;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: var(--bg-grey); /* Using your variable */
  padding: var(--spacing-sm) var(--spacing-lg);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm); /* Using your variable */
`;

const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  /* Simple spin animation for the refresh icon */
  svg {
    transition: transform 0.3s ease;
  }
`;

const ErrorMessage = styled.p`
  color: var(--text-black);
  font-family: var(--font-base);
  font-size: var(--font-sm);
  font-weight: 500;
  margin: 0;
  white-space: nowrap;
`;

const CountdownText = styled.span`
  font-family: var(--font-base);
  font-size: var(--font-xs);
  color: var(--text-muted);
  white-space: nowrap;

  strong {
    color: var(--text-black);
    font-weight: 700;
    font-variant-numeric: tabular-nums; /* Keeps numbers from jumping */
  }
`;