import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  Box,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import { PhotoCamera, Delete } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

// Adicione um novo campo no formulário para definir o tipo de shortcut
const ShortcutModal = ({ open, onClose, onSubmit, shortcut }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [isHeader, setIsHeader] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [customIcon, setCustomIcon] = useState(null);
  const [iconPreview, setIconPreview] = useState("");

  useEffect(() => {
    if (shortcut) {
      setName(shortcut.name);
      setUrl(shortcut.url);
      setIsHeader(shortcut.type === "header");
      setIsFixed(shortcut.fixed || false);
      setCustomIcon(shortcut.customIcon || null);
      setIconPreview(shortcut.customIcon || "");
    } else {
      setName("");
      setUrl("");
      setIsHeader(false);
      setIsFixed(false);
      setCustomIcon(null);
      setIconPreview("");
    }
  }, [shortcut]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        if (typeof base64String === "string") {
          setCustomIcon(base64String);
          setIconPreview(base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setCustomIcon(null);
    setIconPreview("");
  };

  const handleSubmit = () => {
    if (name && url) {
      const newShortcut = {
        name,
        url,
        ...(customIcon && { customIcon }),
        ...(isHeader && { type: "header", fixed: isFixed }),
      };
      onSubmit(newShortcut);
      setName("");
      setUrl("");
      setIsHeader(false);
      setIsFixed(false);
      setCustomIcon(null);
      setIconPreview("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{shortcut ? "Edit shortcut" : "Add shortcut"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="URL"
          type="url"
          fullWidth
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Upload de imagem personalizada */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Ícone personalizado (opcional)
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {iconPreview ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar src={iconPreview} sx={{ width: 48, height: 48 }} />
                <IconButton
                  size="small"
                  onClick={handleRemoveImage}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </Box>
            ) : (
              <Button
                variant="outlined"
                component="label"
                startIcon={<PhotoCamera />}
                sx={{ textTransform: "none" }}
              >
                Escolher imagem
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            )}
          </Box>
          <Typography variant="caption" color="text.secondary">
            Se não escolher uma imagem, será usado o favicon do site
            automaticamente
          </Typography>
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={isHeader}
              onChange={(e) => setIsHeader(e.target.checked)}
            />
          }
          label="Header Shortcut"
        />

        {isHeader && (
          <FormControlLabel
            control={
              <Checkbox
                checked={isFixed}
                onChange={(e) => setIsFixed(e.target.checked)}
              />
            }
            label="Fixed in header"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShortcutModal;
