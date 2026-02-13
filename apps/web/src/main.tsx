import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { RootCSS } from "./root.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootCSS />
    <App />
  </StrictMode>,
);
