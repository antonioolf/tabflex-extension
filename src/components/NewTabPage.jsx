import { Box, Snackbar, IconButton } from "@mui/material";
import {
  Bookmark as BookmarkIcon,
  Widgets as WidgetsIcon,
  Palette as PaletteIcon,
} from "@mui/icons-material";
import { useShortcuts } from "../hooks/useShortcuts";
import Shortcuts from "./Shortcuts";
import { useState } from "react";
import ShortcutModal from "./ShortcutModal";
import BookmarkDrawer from "./BookmarkDrawer";
import React from "react";
import ThemeDrawer from "./ThemeDrawer";
import WidgetDrawer from "./WidgetDrawer";

const NewTabPage = () => {
  const { shortcuts, addShortcut, editShortcut, removeShortcut } =
    useShortcuts();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingShortcut, setEditingShortcut] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Estados para os drawers
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [widgetsOpen, setWidgetsOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  const handleEdit = (shortcut) => {
    setEditingShortcut(shortcut);
    setModalOpen(true);
  };

  const handleSubmit = (shortcut) => {
    if (editingShortcut) {
      editShortcut(editingShortcut.id, shortcut);
    } else {
      addShortcut(shortcut);
    }
    setModalOpen(false);
    setEditingShortcut(null);
  };

  const handleRemove = (shortcutId) => {
    removeShortcut(shortcutId);
    setSnackbarOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        paddingTop: "10%",
        position: "relative",
      }}
    >
      {/* Botão de Bookmarks (canto superior esquerdo) */}
      <IconButton
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          color: "text.primary",
        }}
        onClick={() => setBookmarksOpen(true)}
      >
        <BookmarkIcon />
      </IconButton>

      {/* Botão de Widgets (canto inferior esquerdo) */}
      <IconButton
        sx={{
          position: "absolute",
          bottom: 16,
          left: 16,
          color: "text.primary",
        }}
        onClick={() => setWidgetsOpen(true)}
      >
        <WidgetsIcon />
      </IconButton>

      {/* Botão de Customização de Tema (canto inferior direito) */}
      <IconButton
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          color: "text.primary",
        }}
        onClick={() => setThemeOpen(true)}
      >
        <PaletteIcon />
      </IconButton>

      {/* Componentes dos Drawers */}
      <BookmarkDrawer
        open={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
      />

      <WidgetDrawer open={widgetsOpen} onClose={() => setWidgetsOpen(false)} />

      <ThemeDrawer open={themeOpen} onClose={() => setThemeOpen(false)} />

      {/* Conteúdo principal */}
      <Box sx={{ width: "270px" }}>
        <img
          src="logo.png"
          alt="TabFlex logo"
          style={{ marginBottom: "40px", width: "100%" }}
        />
      </Box>

      <Shortcuts
        shortcuts={shortcuts}
        onAdd={() => setModalOpen(true)}
        onEdit={handleEdit}
        onRemove={handleRemove}
      />

      <ShortcutModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingShortcut(null);
        }}
        onSubmit={handleSubmit}
        shortcut={editingShortcut}
      />

      <Snackbar
        message="Shortcut removed"
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
    </Box>
  );
};

export default NewTabPage;
