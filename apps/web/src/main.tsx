import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { RootStyles } from "./styles.root.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootStyles />
    <App />
  </StrictMode>,
);
