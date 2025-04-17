// src/components/NewTabPage/index.jsx
import { Box, Typography } from "@mui/material";
import { useShortcuts } from "../../hooks/useShortcuts";
import SearchBar from "./SearchBar";
import Shortcuts from "./Shortcuts";
import { useState } from "react";
import ShortcutModal from "./ShortcutModal";

const NewTabPage = () => {
  const { shortcuts, addShortcut, editShortcut, removeShortcut } =
    useShortcuts();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingShortcut, setEditingShortcut] = useState(null);

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: "center" }}>
        TabFlex
      </Typography>

      <SearchBar />

      <Shortcuts
        shortcuts={shortcuts}
        onAdd={() => setModalOpen(true)}
        onEdit={handleEdit}
        onRemove={removeShortcut}
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
    </Box>
  );
};

export default NewTabPage;
