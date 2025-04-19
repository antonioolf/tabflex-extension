import React, { useState } from "react";
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  styled,
  Grid,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Shortcuts = ({ shortcuts, onAdd, onEdit, onRemove }) => {
  return (
    <Grid container spacing={2}>
      {shortcuts.map((shortcut) => (
        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={shortcut.id}>
          <ShortcutItem
            shortcut={shortcut}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        </Grid>
      ))}

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
  );
};

const ShortcutItemStyled = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  minWidth: 112,
  minHeight: 112,
  position: "relative",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  cursor: "pointer",
}));

const ShortcutItem = ({
  shortcut,

  onEdit,
  onRemove,
}) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const open = Boolean(menuAnchorEl);
  const handleClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleEdit = (shortcut) => {
    closeMenu();
    onEdit(shortcut);
  };
  const handleRemove = (shortcut) => {
    closeMenu();
    onRemove(shortcut);
  };

  return (
    <ShortcutItemStyled>
      <Avatar alt={shortcut.name} src={shortcut.name} />

      <IconButton
        className="shortcut-menu-button"
        size="small"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          top: 1,
          right: 1,
          position: "absolute",
        }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={menuAnchorEl}
        open={open}
        onClose={closeMenu}
      >
        <MenuItem onClick={() => handleEdit(shortcut)}>Edit</MenuItem>
        <MenuItem onClick={() => handleRemove(shortcut.id)}>Remove</MenuItem>
      </Menu>

      <Typography lineHeight={1} mt={2}>
        {shortcut.name}
      </Typography>
    </ShortcutItemStyled>
  );
};

export default Shortcuts;
