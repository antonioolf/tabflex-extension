// src/components/TopHeader.jsx
import React from "react";
import { Box, IconButton, Typography, Avatar } from "@mui/material";
import { Settings, Star, Person, Palette } from "@mui/icons-material";
import HeaderShortcuts from "./HeaderShortcuts";

const TopHeader = ({
  onBookmarksClick,
  onThemeClick,
  onSettingsClick,
  onProfileClick,
  headerShortcuts,
  toggleHeaderFixed,
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        display: "flex",
        alignItems: "center",
        gap: 3,
        zIndex: 1000,
      }}
    >
      {/* Header Shortcuts */}
      {headerShortcuts && (
        <HeaderShortcuts
          headerShortcuts={headerShortcuts}
          toggleFixed={toggleHeaderFixed}
        />
      )}

      {/* Ícone de menu do Google Apps */}
      <IconButton
        sx={{
          color: "rgba(255, 255, 255, 0.8)",
          "&:hover": {
            color: "white",
            bgcolor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0.3,
            width: 18,
            height: 18,
          }}
        >
          {[...Array(9)].map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 2,
                height: 2,
                bgcolor: "currentColor",
                borderRadius: "50%",
              }}
            />
          ))}
        </Box>
      </IconButton>

      {/* Avatar do usuário */}
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: "#4285f4",
          cursor: "pointer",
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "white",
          "&:hover": {
            transform: "scale(1.05)",
            transition: "transform 0.2s ease-in-out",
          },
        }}
        onClick={onProfileClick}
      >
        U
      </Avatar>
    </Box>
  );
};

export default TopHeader;
