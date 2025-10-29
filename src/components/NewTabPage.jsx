import { Box, Snackbar } from "@mui/material";
import { useShortcuts } from "../hooks/useShortcuts";
import { useState, useEffect } from "react";
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
import OnboardingDialog from "./OnboardingDialog";
import { useAppTheme } from "../context/ThemeContext.jsx";

const NewTabPage = () => {
  const {
    shortcuts,
    headerShortcuts,
    addShortcut,
    editShortcut,
    removeShortcut,
    toggleHeaderFixed,
  } = useShortcuts();

  const { currentGradient } = useAppTheme();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingShortcut, setEditingShortcut] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [widgetsOpen, setWidgetsOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  // Verificar se é a primeira vez do usuário
  useEffect(() => {
    const onboardingCompleted = localStorage.getItem(
      "tabflex-onboarding-completed"
    );
    if (!onboardingCompleted) {
      setOnboardingOpen(true);
    }
  }, []);

  const handleOnboardingComplete = (userName) => {
    setOnboardingOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        backgroundImage: currentGradient,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top Header */}
      <TopHeader
        onBookmarksClick={() => setBookmarksOpen(true)}
        onThemeClick={() => setThemeOpen(true)}
        onSettingsClick={() => setSettingsOpen(true)}
        onProfileClick={() => setProfileOpen(true)}
        headerShortcuts={headerShortcuts}
        toggleHeaderFixed={toggleHeaderFixed}
      />
      {/* Widgets da barra lateral */}
      <SidebarWidgets
        onBookmarksClick={() => setBookmarksOpen(true)}
        onThemeClick={() => setThemeOpen(true)}
      />{" "}
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
        {/* App Grid with integrated shortcuts */}
        <Box sx={{ mb: 4 }}>
          <AppGrid
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
      {/* Onboarding Dialog */}
      <OnboardingDialog
        open={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        onComplete={handleOnboardingComplete}
      />
    </Box>
  );
};

export default NewTabPage;
