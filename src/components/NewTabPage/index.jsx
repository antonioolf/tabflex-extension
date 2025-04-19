import { Box, Snackbar, Alert } from "@mui/material";
import { useShortcuts } from "../../hooks/useShortcuts";
import SearchBar from "./SearchBar";
import Shortcuts from "./Shortcuts";
import { useState } from "react";
import ShortcutModal from "./ShortcutModal";
import React from "react";

const NewTabPage = () => {
  const { shortcuts, addShortcut, editShortcut, removeShortcut } =
    useShortcuts();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingShortcut, setEditingShortcut] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
        paddingTop: "7%",
      }}
    >
      <Box sx={{ width: "270px" }}>
        <img
          src="logo.png"
          alt="Google Logo"
          style={{ marginBottom: "20px", width: "100%" }}
        />
      </Box>

      <SearchBar />

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
