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

      <Avatar
        sx={{
          // Temporariamente oculto
          display: "none",
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
