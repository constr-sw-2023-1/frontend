import { ThemeProvider } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
