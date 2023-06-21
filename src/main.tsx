import { ThemeProvider } from "@emotion/react";
import React from "react";
import App from "./App"
import ReactDOM from "react-dom/client";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
