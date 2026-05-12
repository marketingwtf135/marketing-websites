import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { captureFbclid } from "./lib/meta";
import { captureGoogleClickIds } from "./lib/ads";

captureFbclid();
captureGoogleClickIds();

createRoot(document.getElementById("root")!).render(<App />);
