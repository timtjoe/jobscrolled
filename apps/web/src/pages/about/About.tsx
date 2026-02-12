import type { RouteConfig } from "@/types";

interface AboutTypes {
  children?: React.JSX.Element;
}

const AboutPage = ({ children }: AboutTypes) => {
  return (
    <>
      <h1>About page</h1>
      {children}
    </>
  );
};

export const AboutRoutes: RouteConfig = {
  path: "/about",
  element: <AboutPage />,
};
