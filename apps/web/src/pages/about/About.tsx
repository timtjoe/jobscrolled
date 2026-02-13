import { ErrorBoundary, TechnicalError } from "@/components/errors";
import type { RouteConfig } from "@/types";
import { useState } from "react";

interface AboutTypes {
  children?: React.JSX.Element;
}

const PageContent = ({ children }: AboutTypes) => {
  // const forceError = (undefined as any).crash()

  return (
    <>
      <h1>About page</h1>
      {children}
    </>
  );
};

export const AboutPage = () => {
  const [key, setKey] = useState(0);
  const handleRetry = () => setKey((prev) => prev + 1);

  return (
    <ErrorBoundary
      key={key}
      fallback={
        <TechnicalError
          message="About page is temporarily unavailable."
          onRetry={handleRetry}
          autoRetrySeconds={5}
        />
      }
    >
      <PageContent />
    </ErrorBoundary>
  );
};

export const AboutRoutes: RouteConfig = {
  path: "/about",
  element: <AboutPage />,
};