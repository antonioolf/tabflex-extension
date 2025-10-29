import React, { createContext, useContext } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { useTheme } from "../hooks/useTheme";

const ThemeContext = createContext(null);

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const themeData = useTheme();

  return (
    <ThemeContext.Provider value={themeData}>
      <MuiThemeProvider theme={themeData.muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
