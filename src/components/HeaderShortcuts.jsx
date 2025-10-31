// components/NewTabPage/HeaderShortcuts.js
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Apps as AppsIcon } from "@mui/icons-material";
import { useState } from "react";
import React from "react";

const HeaderShortcuts = ({ headerShortcuts, toggleFixed }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const fixedShortcuts = headerShortcuts?.filter((s) => s.fixed) || [];
  const nonFixedShortcuts = headerShortcuts?.filter((s) => !s.fixed) || [];

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Fixed shortcuts displayed as links */}
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
              color: "primary.main",
            },
          }}
        >
          {shortcut.name}
        </Typography>
      ))}

      {/* Apps menu button - only show if there are non-fixed shortcuts */}
      {nonFixedShortcuts.length > 0 && (
        <>
          <IconButton
            size="small"
            onClick={handleClick}
            sx={{
              color: "text.primary",
              "&:hover": {
                // Cor do texto ao passar o mouse
                color: "primary.main",
              },
            }}
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
                  if (toggleFixed) {
                    toggleFixed(shortcut.id);
                  }
                }}
                sx={{
                  color: "text.primary",
                  textDecoration: "none",
                }}
              >
                {shortcut.name}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </>
  );
};

export default HeaderShortcuts;
