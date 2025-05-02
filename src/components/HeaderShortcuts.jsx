// components/NewTabPage/HeaderShortcuts.js
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Apps as AppsIcon } from "@mui/icons-material";
import { useState } from "react";
import React from "react";

const HeaderShortcuts = ({ headerShortcuts, toggleFixed }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const fixedShortcuts = headerShortcuts.filter((s) => s.fixed);
  const nonFixedShortcuts = headerShortcuts.filter((s) => !s.fixed);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      {fixedShortcuts.map((shortcut) => (
        <Typography
          key={shortcut.id}
          component="a"
          href={shortcut.url}
          rel="noopener noreferrer"
          sx={{
            color: "text.primary",
            textDecoration: "none",
            fontSize: "0.875rem",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {shortcut.name}
        </Typography>
      ))}

      <IconButton
        size="small"
        onClick={handleClick}
        sx={{ color: "text.primary" }}
      >
        <AppsIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {nonFixedShortcuts.map((shortcut) => (
          <MenuItem
            key={shortcut.id}
            component="a"
            href={shortcut.url}
            rel="noopener noreferrer"
            onClick={() => {
              handleClose();
              toggleFixed(shortcut.id);
            }}
          >
            {shortcut.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default HeaderShortcuts;
