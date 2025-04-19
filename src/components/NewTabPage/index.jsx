import { Box } from "@mui/material";
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
        height: "100vh",
        paddingTop: "7%",
      }}
    >
      <Box sx={{ width: "270px" }}>
        <img
          src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
          alt="Google Logo"
          style={{ marginBottom: "20px" }}
        />
      </Box>

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
