import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfirmModal } from "./components/modal/ConfirmModal.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfirmModal />
    <App />
  </StrictMode>
);
