import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Failed to find the root element. Ensure index.html has <div id='root'></div>");
} else {
  try {
    createRoot(rootElement).render(<App />);
  } catch (error) {
    console.error("Rendering error:", error);
  }
}

