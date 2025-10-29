import React from "react";
import ReactDOM from "react-dom/client";
import NewTabPage from "./components/NewTabPage.jsx";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "./context/ThemeContext.jsx";

const App = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <NewTabPage />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
