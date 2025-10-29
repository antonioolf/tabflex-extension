import { Box, Snackbar } from "@mui/material";
import { useShortcuts } from "../hooks/useShortcuts";
import { useState } from "react";
import ShortcutModal from "./ShortcutModal";
import BookmarkDrawer from "./BookmarkDrawer";
import React from "react";
import ThemeDrawer from "./ThemeDrawer";
import WidgetDrawer from "./WidgetDrawer";
import TopHeader from "./TopHeader";
import SidebarWidgets from "./SidebarWidgets";
import AppGrid from "./AppGrid";
import SearchBar from "./SearchBar";
import GreetingFooter from "./GreetingFooter";

const NewTabPage = () => {
  const { shortcuts, addShortcut, editShortcut, removeShortcut } =
    useShortcuts();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingShortcut, setEditingShortcut] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [widgetsOpen, setWidgetsOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f0f2f5",
        position: "relative",
        backgroundImage: "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
        overflow: "hidden",
      }}
    >
      {/* Top Header */}
      <TopHeader
        onBookmarksClick={() => setBookmarksOpen(true)}
        onThemeClick={() => setThemeOpen(true)}
        onSettingsClick={() => setSettingsOpen(true)}
        onProfileClick={() => setProfileOpen(true)}
      />

      {/* Sidebar Widgets */}
      <SidebarWidgets />

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          px: 4,
        }}
      >
        {/* App Grid */}
        <Box sx={{ mb: 4 }}>
          <AppGrid />
        </Box>

        {/* Search Bar */}
        <SearchBar />
      </Box>

      {/* Greeting Footer */}
      <GreetingFooter />

      {/* Drawers */}
      <BookmarkDrawer
        open={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
      />

      <ThemeDrawer open={themeOpen} onClose={() => setThemeOpen(false)} />

      <WidgetDrawer open={widgetsOpen} onClose={() => setWidgetsOpen(false)} />

      {/* Legacy Modal - manter para compatibilidade */}
      <ShortcutModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingShortcut(null);
        }}
        onSubmit={(data) => {
          if (editingShortcut) {
            editShortcut(editingShortcut.id, data);
          } else {
            addShortcut(data);
          }
          setModalOpen(false);
          setEditingShortcut(null);
          setSnackbarOpen(true);
        }}
        shortcut={editingShortcut}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Shortcut saved successfully!"
      />
    </Box>
  );
};

export default NewTabPage;
