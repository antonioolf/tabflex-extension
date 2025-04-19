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
    <Box
      sx={{ width: "70%" }}
      flexWrap={"wrap"}
      display={"flex"}
      flexDirection="row"
      justifyContent={"center"}
    >
      {shortcuts.map((shortcut) => (
        <ShortcutItem
          key={shortcut.id}
          shortcut={shortcut}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      ))}

      <ShortcutItemStyled
        key={0}
        sx={{
          textAlign: "center",
          cursor: "pointer",
          opacity: 0.7,
          "&:hover": { opacity: 1 },
        }}
        onClick={onAdd}
      >
        <Avatar>
          <AddIcon />
        </Avatar>
        <Typography lineHeight={1} mt={2}>
          Add Shortcut
        </Typography>
      </ShortcutItemStyled>
    </Box>
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

  "& .shortcut-menu-button": {
    display: "none",
  },

  "&:hover": {
    backgroundColor: theme.palette.action.hover,

    "& .shortcut-menu-button": {
      display: "flex",
    },
  },
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
