import React from "react";
import ReactDOM from "react-dom/client";
import NewTabPage from "./components/NewTabPage.jsx";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Azul do MUI
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NewTabPage />
    </ThemeProvider>
  </React.StrictMode>
);
