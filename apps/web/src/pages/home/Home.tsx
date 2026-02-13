import type React from "react";

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
