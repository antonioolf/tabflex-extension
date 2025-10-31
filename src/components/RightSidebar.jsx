// src/components/RightSidebar.jsx
import React from "react";
import { Box, Button } from "@mui/material";
import { BookmarkBorder, Palette, Settings } from "@mui/icons-material";

const RightSidebar = ({ onBookmarksClick, onThemeClick, onConfigClick }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        right: 32,
        top: "15%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 200,
      }}
    >
      {/* Botão de Bookmarks */}
      <Button
        variant="outlined"
        startIcon={<BookmarkBorder />}
        onClick={onBookmarksClick}
        sx={{
          bgcolor: "background.paper",
          backdropFilter: "blur(10px)",
          borderRadius: 4,
          boxShadow: (theme) => theme.shadows[8],
          border: 1,
          borderColor: "divider",
          color: "text.primary",
          textTransform: "none",
          fontWeight: 500,
          py: 1.5,
          "&:hover": {
            bgcolor: "action.hover",
            boxShadow: (theme) => theme.shadows[12],
          },
        }}
      >
        Bookmarks
      </Button>

      {/* Botão de Temas */}
      <Button
        variant="outlined"
        startIcon={<Palette />}
        onClick={onThemeClick}
        sx={{
          bgcolor: "background.paper",
          backdropFilter: "blur(10px)",
          borderRadius: 4,
          boxShadow: (theme) => theme.shadows[8],
          border: 1,
          borderColor: "divider",
          color: "text.primary",
          textTransform: "none",
          fontWeight: 500,
          py: 1.5,
          "&:hover": {
            bgcolor: "action.hover",
            boxShadow: (theme) => theme.shadows[12],
          },
        }}
      >
        Temas
      </Button>

      {/* Botão de Configurações */}
      <Button
        variant="outlined"
        startIcon={<Settings />}
        onClick={onConfigClick}
        sx={{
          bgcolor: "background.paper",
          backdropFilter: "blur(10px)",
          borderRadius: 4,
          boxShadow: (theme) => theme.shadows[8],
          border: 1,
          borderColor: "divider",
          color: "text.primary",
          textTransform: "none",
          fontWeight: 500,
          py: 1.5,
          "&:hover": {
            bgcolor: "action.hover",
            boxShadow: (theme) => theme.shadows[12],
          },
        }}
      >
        Configurar
      </Button>
    </Box>
  );
};

export default RightSidebar;
