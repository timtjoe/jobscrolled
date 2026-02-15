import React, { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  /** The UI that might crash */
  children: ReactNode;
  /** Custom UI to show when a crash occurs */
  fallback?: ReactNode;
  /** Callback to log errors to a service like Sentry */
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
}

/**
 * Modernized ErrorBoundary for React 19.
 * Note: Class components are still required for Error Boundaries as of React 19.
 */
export class ErrorBoundary extends Component<Props, State> {
  // Modern Class Property: Replaces the need for a constructor
  state: State = { hasError: false };

  /**
   * Static method to update state after an error is thrown.
   * This triggers the render of the fallback UI.
   */
  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  /**
   * Lifecycle method for side-effects (logging, analytics).
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const { onError } = this.props;

    if (onError) {
      onError(error, errorInfo);
    }
    
    // Using a more modern logging approach
    console.error("ErrorBoundary caught an exception:", error, errorInfo);
  }

  render() {
    // If an error occurred, render fallback; otherwise, render children.
    if (this.state.hasError) {
      return this.props.fallback ?? null; // Nullish coalescing for cleaner logic
    }

    return this.props.children;
  }
}