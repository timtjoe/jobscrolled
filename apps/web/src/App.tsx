import { createBrowserRouter, RouterProvider } from "react-router";
import { AppRoutes } from "./Routes";
import type React from "react";
import { RootCSS } from "./root.css";

const router = createBrowserRouter(AppRoutes, {
  basename: "/jobscrolled/",
});

function App(): React.JSX.Element {
  return (
    <>
      <RootCSS />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
