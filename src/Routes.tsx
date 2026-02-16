import { Layout } from "./components/Layout";
import { JobRoutes, Redirector } from "./pages";

export const AppRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <Redirector /> }, JobRoutes],
  },
];
