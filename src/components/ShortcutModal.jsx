import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

// Adicione um novo campo no formulário para definir o tipo de shortcut
const ShortcutModal = ({ open, onClose, onSubmit, shortcut }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [isHeader, setIsHeader] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    if (shortcut) {
      setName(shortcut.name);
      setUrl(shortcut.url);
      setIsHeader(shortcut.type === "header");
      setIsFixed(shortcut.fixed || false);
    } else {
      setName("");
      setUrl("");
      setIsHeader(false);
      setIsFixed(false);
    }
  }, [shortcut]);

  const handleSubmit = () => {
    if (name && url) {
      const newShortcut = {
        name,
        url,
        ...(isHeader && { type: "header", fixed: isFixed }),
      };
      onSubmit(newShortcut);
      setName("");
      setUrl("");
      setIsHeader(false);
      setIsFixed(false);
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
