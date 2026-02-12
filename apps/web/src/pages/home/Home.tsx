import type React from "react";
import type { RouteConfig } from "@/types";

interface HomeTypes {
  children?: React.ReactNode;
}

export const Homepage = ({ children }: HomeTypes): React.JSX.Element => {
  return (
    <>
      <h1>Home page</h1>
      {children}
    </>
  );
};

export const HomeRoutes: RouteConfig = {
  path: "/",
  element: <Homepage />,
};
