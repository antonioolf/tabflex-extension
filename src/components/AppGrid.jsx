// src/components/AppGrid.jsx
import React, { useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  Avatar,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import { Add, MoreVert } from "@mui/icons-material";

const AppGrid = ({ shortcuts, onAdd, onEdit, onRemove }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newApp, setNewApp] = useState({ name: "", url: "" });
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);

  const handleAppClick = (url) => {
    window.open(url, "_blank");
  };

  const handleAddApp = () => {
    setDialogOpen(true);
  };

  const handleSaveApp = () => {
    if (newApp.name && newApp.url) {
      const appData = {
        name: newApp.name,
        url: newApp.url.startsWith("http")
          ? newApp.url
          : `https://${newApp.url}`,
      };
      onAdd(appData);
      setNewApp({ name: "", url: "" });
      setDialogOpen(false);
    }
  };

  const handleMenuClick = (event, app) => {
    event.preventDefault();
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setSelectedApp(app);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedApp(null);
  };

  const handleEdit = () => {
    if (selectedApp) {
      onEdit(selectedApp);
    }
    handleMenuClose();
  };

  const handleRemove = () => {
    if (selectedApp) {
      onRemove(selectedApp.id);
    }
    handleMenuClose();
  };

  const getIcon = (url) => {
    try {
      const domain = new URL(url).hostname.replace("www.", "");
      return `https://www.google.com/s2/favicons?sz=64&domain_url=${domain}`;
    } catch {
      return null;
    }
  };

  // Função para gerar cor baseada no nome
  const stringToColor = (string) => {
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
  };

  const AppCard = ({ app, isAddButton = false }) => (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        },
        height: 80,
        width: 80,
        bgcolor: isAddButton ? "grey.100" : "background.paper",
        position: "relative",
        "& .shortcut-menu-button": {
          display: "none",
        },
        "&:hover .shortcut-menu-button": {
          display: "flex",
        },
      }}
    >
      <CardActionArea
        onClick={isAddButton ? handleAddApp : () => handleAppClick(app.url)}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 1,
        }}
      >
        {isAddButton ? (
          <>
            <Add sx={{ fontSize: 32, color: "text.secondary", mb: 0.5 }} />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: "0.65rem" }}
            >
              Add Site
            </Typography>
          </>
        ) : (
          <>
            <Avatar
              src={getIcon(app.url)}
              sx={{
                width: 32,
                height: 32,
                bgcolor: stringToColor(app.name),
                mb: 0.5,
              }}
              imgProps={{
                onError: (e) => {
                  const target = e.target;
                  if (target instanceof HTMLImageElement) {
                    target.style.display = "none";
                  }
                },
              }}
            >
              {app.name.charAt(0)}
            </Avatar>
            <Typography
              variant="caption"
              sx={{
                textAlign: "center",
                color: "text.primary",
                fontWeight: 500,
                fontSize: "0.65rem",
                lineHeight: 1,
              }}
            >
              {app.name}
            </Typography>

            {/* Menu Button */}
            <IconButton
              className="shortcut-menu-button"
              size="small"
              onClick={(e) => handleMenuClick(e, app)}
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                bgcolor: "background.paper",
                color: "text.primary",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <MoreVert fontSize="small" />
            </IconButton>
          </>
        )}
      </CardActionArea>
    </Card>
  );

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          mx: "auto",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2,
          }}
        >
          {shortcuts &&
            shortcuts.map((app) => <AppCard key={app.id} app={app} />)}
          <AppCard isAddButton app={null} />
        </Box>
      </Box>

      {/* Context Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleEdit}>
          <Typography>Edit</Typography>
        </MenuItem>
        <MenuItem onClick={handleRemove}>
          <Typography>Remove</Typography>
        </MenuItem>
      </Menu>

      {/* Dialog para adicionar novo app */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Site</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Site Name"
            fullWidth
            variant="outlined"
            value={newApp.name}
            onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Site URL"
            fullWidth
            variant="outlined"
            value={newApp.url}
            onChange={(e) => setNewApp({ ...newApp, url: e.target.value })}
            placeholder="example.com"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveApp} variant="contained">
            Add Site
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppGrid;
