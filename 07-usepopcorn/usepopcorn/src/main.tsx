import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import StartRating from "@/components/Shared/StartRating";
// import './index.css'
// import App from './App.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StartRating maxRating={5} />
    <StartRating maxRating={10} />
  </StrictMode>
);
