import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./index.css";

// Enforce one primary domain: send www / legacy subdomains to the canonical host.
if (typeof window !== "undefined") {
  const host = window.location.hostname;
  const CANONICAL_HOST = "consultwithprofessionals.com";
  const shouldRedirect =
    host === `www.${CANONICAL_HOST}` ||
    (host.endsWith(`.${CANONICAL_HOST}`) && host !== CANONICAL_HOST);
  if (shouldRedirect) {
    window.location.replace(
      `https://${CANONICAL_HOST}${window.location.pathname}${window.location.search}${window.location.hash}`
    );
  }
}

createRoot(document.getElementById("root")!).render(<App />);
