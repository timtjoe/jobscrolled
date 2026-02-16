import type React from "react";

export interface RouteConfig {
  path: string;
  element: React.JSX.Element;
  label?: string;
  children?: RouteConfig[];
}
