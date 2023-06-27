import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { CourseProvider } from "@contexts/CourseContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CourseProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CourseProvider>
    </ThemeProvider>
  </React.StrictMode>
);
