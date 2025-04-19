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
  Link,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Função para converter string em cor
function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

// Função para criar props do Avatar baseado no nome
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1]?.[0] || ""}`,
  };
}

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

const ShortcutItemStyled = styled(Link)(({ theme }) => ({
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
  textDecoration: "none",
  color: theme.palette.text.primary,

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

const ShortcutItem = ({ shortcut, onEdit, onRemove }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const open = Boolean(menuAnchorEl);
  const handleClick = (event) => {
    event.preventDefault();
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
    <ShortcutItemStyled href={shortcut.url} rel="noopener noreferrer">
      <Avatar alt={shortcut.name} {...stringAvatar(shortcut.name)} />

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
