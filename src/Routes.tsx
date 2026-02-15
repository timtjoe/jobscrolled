// routes.tsx
import { Root } from "@/components/layout/Root";
import { PublicLayout } from "@/components/layout";
import { Homepage, AboutRoutes } from "@/pages";

export const AppRoutes = [
  {
    path: "/",
    element: <Root />, // The global shell (Providers, etc)
    children: [
      {
        element: <PublicLayout />, // The "Main Site" look (Nav + Footer)
        children: [
          {
            index: true,
            element: <Homepage />,
          },
          AboutRoutes,
        ],
      },
      // Example of improvement: You can now easily add a layout without Nav
      /* {
        path: "auth",
        element: <AuthLayout />, 
        children: [{ path: "login", element: <Login /> }]
      } 
      */
    ],
  },
];
