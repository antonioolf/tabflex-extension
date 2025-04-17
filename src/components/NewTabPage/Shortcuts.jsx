// src/components/NewTabPage/Shortcuts.jsx
import {
  Grid,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

const Shortcuts = ({ shortcuts, onAdd, onEdit, onRemove }) => {
  const [hoveredShortcut, setHoveredShortcut] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedShortcut, setSelectedShortcut] = useState(null);

  const handleMouseEnter = (shortcutId) => {
    setHoveredShortcut(shortcutId);
  };

  const handleMouseLeave = () => {
    setHoveredShortcut(null);
  };

  const handleMenuOpen = (event, shortcut) => {
    setAnchorEl(event.currentTarget);
    setSelectedShortcut(shortcut);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedShortcut(null);
  };

  const handleEdit = () => {
    onEdit(selectedShortcut);
    handleMenuClose();
  };

  const handleRemove = () => {
    onRemove(selectedShortcut.id);
    handleMenuClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "60%",
        margin: "0 auto",
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        {shortcuts.map((shortcut) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            key={shortcut.id}
            onMouseEnter={() => handleMouseEnter(shortcut.id)}
            onMouseLeave={handleMouseLeave}
          >
            <Box
              sx={{
                position: "relative",
                textAlign: "center",
                padding: 2,
                borderRadius: 2,
                backgroundColor:
                  hoveredShortcut === shortcut.id ? "#f1f3f4" : "transparent",
                transition: "background-color 0.2s",
              }}
            >
              <a
                href={shortcut.url}
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Box
                  sx={{
                    backgroundColor: "#f1f3f4",
                    borderRadius: "50%",
                    width: 48,
                    height: 48,
                    margin: "0 auto 8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {shortcut.name[0].toUpperCase()}
                </Box>
                <Typography variant="body2">{shortcut.name}</Typography>
              </a>

              {hoveredShortcut === shortcut.id && (
                <IconButton
                  size="small"
                  aria-controls={
                    anchorEl ? `shortcut-menu-${shortcut.id}` : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={anchorEl ? "true" : undefined}
                  onClick={(e) => handleMenuOpen(e, shortcut)}
                  sx={{
                    top: 8,
                    right: 8,
                  }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Grid>
        ))}

        <Grid item xs={6} sm={4} md={3}>
          <Box
            sx={{
              textAlign: "center",
              cursor: "pointer",
              opacity: 0.7,
              "&:hover": { opacity: 1 },
            }}
            onClick={onAdd}
          >
            <Box
              sx={{
                backgroundColor: "#f1f3f4",
                borderRadius: "50%",
                width: 48,
                height: 48,
                margin: "0 auto 8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AddIcon />
            </Box>
            <Typography variant="body2">Add shortcut</Typography>
          </Box>
        </Grid>
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleRemove}>Remove</MenuItem>
      </Menu>
    </Box>
  );
};

export default Shortcuts;
