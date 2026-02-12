import { Button } from "@repo/ui/button";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AppRoutes } from "./Routes";
import type React from "react";
const router = createBrowserRouter(AppRoutes, {
  basename: "/jobscrolled/",
});

function App(): React.JSX.Element {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
