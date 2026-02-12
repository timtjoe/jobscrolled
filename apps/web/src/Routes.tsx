import { Root } from "@/components/Root";
import { Homepage, AboutRoutes } from "@/pages";

// Enhance interface
interface RouteConfig {}

export const AppRoutes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      AboutRoutes,
    ],
  },
];
