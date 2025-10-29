import { useState, useEffect, createContext, useContext } from "react";
import { createTheme } from "@mui/material/styles";

// Definição dos temas disponíveis
export const themes = {
  light: {
    name: "Light",
    description: "Tema claro e moderno",
    gradient: "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
    palette: {
      mode: "light",
      primary: {
        main: "#1976d2",
        light: "#42a5f5",
        dark: "#1565c0",
      },
      secondary: {
        main: "#dc004e",
        light: "#ff5983",
        dark: "#9a0036",
      },
      background: {
        default: "#f5f5f5",
        paper: "#ffffff",
      },
      text: {
        primary: "#212121",
        secondary: "#757575",
      },
    },
  },
  dark: {
    name: "Dark",
    description: "Tema escuro elegante",
    gradient: "linear-gradient(135deg, #0d1117 0%, #1a1a2e 100%)",
    palette: {
      mode: "dark",
      primary: {
        main: "#90caf9",
        light: "#bbdefb",
        dark: "#42a5f5",
      },
      secondary: {
        main: "#f48fb1",
        light: "#ffc1e3",
        dark: "#bf5f82",
      },
      background: {
        default: "#121212",
        paper: "#1e1e1e",
      },
      text: {
        primary: "#ffffff",
        secondary: "#b3b3b3",
      },
    },
  },
  blue: {
    name: "Ocean Blue",
    description: "Tema azul oceânico",
    gradient: "linear-gradient(135deg, #e1f5fe 0%, #e0f2f1 100%)",
    palette: {
      mode: "light",
      primary: {
        main: "#0277bd",
        light: "#58a5f0",
        dark: "#004c8c",
      },
      secondary: {
        main: "#00acc1",
        light: "#5ddef4",
        dark: "#007c91",
      },
      background: {
        default: "#e3f2fd",
        paper: "#ffffff",
      },
      text: {
        primary: "#01579b",
        secondary: "#0277bd",
      },
    },
  },
  purple: {
    name: "Royal Purple",
    description: "Tema roxo real",
    gradient: "linear-gradient(135deg, #f3e5f5 0%, #e8eaf6 100%)",
    palette: {
      mode: "light",
      primary: {
        main: "#7b1fa2",
        light: "#ae52d4",
        dark: "#4a0072",
      },
      secondary: {
        main: "#ab47bc",
        light: "#df78ef",
        dark: "#790e8b",
      },
      background: {
        default: "#f3e5f5",
        paper: "#ffffff",
      },
      text: {
        primary: "#4a148c",
        secondary: "#7b1fa2",
      },
    },
  },
  green: {
    name: "Nature Green",
    description: "Tema verde natureza",
    gradient: "linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%)",
    palette: {
      mode: "light",
      primary: {
        main: "#388e3c",
        light: "#6abf69",
        dark: "#00600f",
      },
      secondary: {
        main: "#66bb6a",
        light: "#98ee99",
        dark: "#338a3e",
      },
      background: {
        default: "#e8f5e8",
        paper: "#ffffff",
      },
      text: {
        primary: "#1b5e20",
        secondary: "#388e3c",
      },
    },
  },
  sunset: {
    name: "Sunset Orange",
    description: "Tema laranja pôr do sol",
    gradient: "linear-gradient(135deg, #fff3e0 0%, #fce4ec 100%)",
    palette: {
      mode: "light",
      primary: {
        main: "#f57c00",
        light: "#ffad42",
        dark: "#bb4d00",
      },
      secondary: {
        main: "#ff9800",
        light: "#ffc947",
        dark: "#c66900",
      },
      background: {
        default: "#fff3e0",
        paper: "#ffffff",
      },
      text: {
        primary: "#e65100",
        secondary: "#f57c00",
      },
    },
  },
};

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState("light");

  // Carregar tema salvo no localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("tabflex-theme");
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Salvar tema no localStorage quando mudar
  const changeTheme = (themeKey) => {
    if (themes[themeKey]) {
      setCurrentTheme(themeKey);
      localStorage.setItem("tabflex-theme", themeKey);
    }
  };

  // Criar o tema MUI baseado na configuração atual
  const muiTheme = createTheme(themes[currentTheme]);

  return {
    currentTheme,
    changeTheme,
    muiTheme,
    availableThemes: themes,
    currentGradient: themes[currentTheme]?.gradient,
  };
};
