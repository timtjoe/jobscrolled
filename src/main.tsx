import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import { RootStyles } from "./styles.root.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootStyles />
    <App />
  </StrictMode>,
);
