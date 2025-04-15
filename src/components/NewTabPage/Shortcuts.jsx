// src/components/NewTabPage/Shortcuts.jsx
import { Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

const Shortcuts = ({ shortcuts, onAdd, onEdit, onRemove }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedShortcut, setSelectedShortcut] = useState(null);

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
    <Grid container spacing={2}>
      {shortcuts.map((shortcut) => (
        <Grid item xs={6} sm={4} md={3} key={shortcut.id}>
          <div style={{ textAlign: "center", position: "relative" }}>
            <a
              href={shortcut.url}
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
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
              </div>
              <Typography variant="body2">{shortcut.name}</Typography>
            </a>

            <IconButton
              size="small"
              onClick={(e) => handleMenuOpen(e, shortcut)}
              style={{ position: "absolute", top: 0, right: 0 }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </div>
        </Grid>
      ))}

      <Grid item xs={6} sm={4} md={3}>
        <div
          style={{
            textAlign: "center",
            cursor: "pointer",
            opacity: 0.7,
            "&:hover": { opacity: 1 },
          }}
          onClick={onAdd}
        >
          <div
            style={{
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
          </div>
          <Typography variant="body2">Add shortcut</Typography>
        </div>
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleRemove}>Remove</MenuItem>
      </Menu>
    </Grid>
  );
};

export default Shortcuts;
