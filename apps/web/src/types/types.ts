import type React from "react";

/** Configuration object for application routing and navigation */
export interface RouteConfig {
  path: string;
  element: React.JSX.Element;
  label?: string;
  children?: RouteConfig[];
}
