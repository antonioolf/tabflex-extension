import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Palette,
  Check,
  Close,
  LightMode,
  DarkMode,
  Water,
  LocalFlorist,
  AutoAwesome,
  WbSunny,
} from "@mui/icons-material";
import React from "react";
import { useAppTheme } from "../context/ThemeContext.jsx";

const ThemeDrawer = ({ open, onClose }) => {
  const { currentTheme, changeTheme, availableThemes } = useAppTheme();

  const getThemeIcon = (themeKey) => {
    switch (themeKey) {
      case "light":
        return <LightMode />;
      case "dark":
        return <DarkMode />;
      case "blue":
        return <Water />;
      case "purple":
        return <AutoAwesome />;
      case "green":
        return <LocalFlorist />;
      case "sunset":
        return <WbSunny />;
      default:
        return <Palette />;
    }
  };

  const handleThemeSelect = (themeKey) => {
    changeTheme(themeKey);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 320, height: "100%" }}>
        {/* Header */}
        <Box
          sx={{
            p: 3,
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Palette color="primary" />
            <Typography variant="h6" fontWeight={600}>
              Temas
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>

        {/* Current Theme Info */}
        <Box sx={{ p: 3, bgcolor: "background.default" }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Tema Atual
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                width: 40,
                height: 40,
              }}
            >
              {getThemeIcon(currentTheme)}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight={500}>
                {availableThemes[currentTheme]?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {availableThemes[currentTheme]?.description}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* Theme List */}
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ p: 2, pb: 1 }}
          >
            Temas Disponíveis
          </Typography>
          <List>
            {Object.entries(availableThemes).map(([themeKey, theme]) => (
              <ListItem key={themeKey} disablePadding>
                <ListItemButton
                  onClick={() => handleThemeSelect(themeKey)}
                  selected={currentTheme === themeKey}
                  sx={{
                    py: 2,
                    px: 3,
                    "&.Mui-selected": {
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                      "& .MuiListItemIcon-root": {
                        color: "primary.contrastText",
                      },
                      "& .MuiTypography-root": {
                        color: "primary.contrastText",
                      },
                    },
                  }}
                >
                  <ListItemIcon>
                    <Avatar
                      sx={{
                        bgcolor:
                          currentTheme === themeKey
                            ? "primary.contrastText"
                            : theme.palette.primary.main,
                        color:
                          currentTheme === themeKey
                            ? "primary.main"
                            : theme.palette.primary.contrastText,
                        width: 32,
                        height: 32,
                      }}
                    >
                      {getThemeIcon(themeKey)}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Typography variant="subtitle1" fontWeight={500}>
                          {theme.name}
                        </Typography>
                        {currentTheme === themeKey && (
                          <Chip
                            size="small"
                            label="Ativo"
                            icon={<Check />}
                            sx={{
                              bgcolor: "primary.contrastText",
                              color: "primary.main",
                              fontWeight: 500,
                            }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            currentTheme === themeKey
                              ? "primary.contrastText"
                              : "text.secondary",
                          opacity: 0.8,
                        }}
                      >
                        {theme.description}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="caption" color="text.secondary" align="center">
            Os temas são aplicados em toda a aplicação
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ThemeDrawer;
