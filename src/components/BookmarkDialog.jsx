// src/components/BookmarkDialog.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import React, { useState, useEffect } from "react";

const BookmarkDialog = ({
  open,
  onClose,
  onSave,
  type = "bookmark",
  folders = [],
  editingItem = null,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    folderId: "",
  });

  useEffect(() => {
    if (open && editingItem) {
      // Preencher formulário com dados do item sendo editado
      setFormData({
        name: editingItem.title || "",
        url: editingItem.url || "",
        folderId: "",
      });
    } else if (!open) {
      setFormData({ name: "", url: "", folderId: "" });
    }
  }, [open, editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "bookmark" && formData.name && formData.url) {
      onSave(
        {
          title: formData.name,
          url: formData.url,
        },
        formData.folderId || null
      );
    } else if (type === "folder" && formData.name) {
      onSave(formData.name, formData.folderId || null);
    }
    onClose();
  };

  const getFlatFolders = (items, level = 0) => {
    let result = [];
    items.forEach((item) => {
      if (item.children) {
        // É uma pasta (tem children)
        result.push({
          id: item.id,
          name: "  ".repeat(level) + item.title,
          level,
        });
        if (item.children) {
          result = result.concat(getFlatFolders(item.children, level + 1));
        }
      }
    });
    return result;
  };

  const flatFolders = getFlatFolders(folders);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {editingItem
          ? type === "bookmark"
            ? "Editar Favorito"
            : "Editar Pasta"
          : type === "bookmark"
          ? "Adicionar Favorito"
          : "Adicionar Pasta"}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              autoFocus
              label="Nome"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              fullWidth
            />

            {type === "bookmark" && (
              <TextField
                label="URL"
                type="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                required
                fullWidth
                placeholder="https://example.com"
              />
            )}

            {flatFolders.length > 0 && !editingItem && (
              <FormControl fullWidth>
                <InputLabel>Pasta (opcional)</InputLabel>
                <Select
                  value={formData.folderId}
                  onChange={(e) =>
                    setFormData({ ...formData, folderId: e.target.value })
                  }
                  label="Pasta (opcional)"
                >
                  <MenuItem value="">
                    <em>Raiz</em>
                  </MenuItem>
                  {flatFolders.map((folder) => (
                    <MenuItem key={folder.id} value={folder.id}>
                      {folder.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            {editingItem
              ? type === "bookmark"
                ? "Salvar Favorito"
                : "Salvar Pasta"
              : type === "bookmark"
              ? "Adicionar Favorito"
              : "Criar Pasta"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BookmarkDialog;
