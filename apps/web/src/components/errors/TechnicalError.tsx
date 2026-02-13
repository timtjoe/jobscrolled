import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Icons } from "@/components/icons";

interface ITechnicalError {
  message?: string;
  onRetry?: () => void;
  autoRetrySeconds?: number;
}

export const TechnicalError = ({
  message = "Technical error occured.",
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
            <Icons.refresh size={18} color="var(--bg-black)" />
          ) : (
            <Icons.circle size={18} color="var(--text-red)" strokeWidth={2} />
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

/* --- Styled Components --- */

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md) var(--spacing-lg);
  min-height: 100px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--bg-soft);
  padding: 10px 16px;
  border-radius: 14px; /* Slightly softer squircle for the inline row */
`;

const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ErrorMessage = styled.p`
  color: var(--text-main);
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
  white-space: nowrap;
`;

const CountdownText = styled.span`
  font-size: 0.8rem;
  color: var(--text-muted);
  white-space: nowrap;

  strong {
    color: var(--text-bold);
    font-variant-numeric: tabular-nums;
  }
`;
