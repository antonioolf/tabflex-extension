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
import HeaderShortcuts from "./HeaderShortcuts"; // Nova importação

const NewTabPage = () => {
  const {
    shortcuts,
    headerShortcuts, // Novo estado
    addShortcut,
    editShortcut,
    removeShortcut,
    toggleHeaderFixed, // Nova função
  } = useShortcuts();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingShortcut, setEditingShortcut] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [widgetsOpen, setWidgetsOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

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
      {/* Adicionar HeaderShortcuts no topo direito */}
      <HeaderShortcuts
        headerShortcuts={headerShortcuts}
        toggleFixed={toggleHeaderFixed}
      />

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

      <Shortcuts
        shortcuts={shortcuts}
        onAdd={() => setModalOpen(true)}
        onEdit={(shortcut) => {
          setEditingShortcut(shortcut);
          setModalOpen(true);
        }}
        onRemove={(shortcutId) => {
          removeShortcut(shortcutId);
          setSnackbarOpen(true);
        }}
      />

      <ShortcutModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingShortcut(null);
        }}
        onSubmit={(shortcut) => {
          if (editingShortcut) {
            editShortcut(editingShortcut.id, shortcut);
          } else {
            addShortcut(shortcut);
          }
          setModalOpen(false);
          setEditingShortcut(null);
        }}
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
