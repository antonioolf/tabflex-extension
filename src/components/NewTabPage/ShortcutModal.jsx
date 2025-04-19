import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";

const ShortcutModal = ({ open, onClose, onSubmit, shortcut }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (shortcut) {
      setName(shortcut.name);
      setUrl(shortcut.url);
    } else {
      setName("");
      setUrl("");
    }
  }, [shortcut]);

  const handleSubmit = () => {
    if (name && url) {
      onSubmit({ name, url });
      setName("");
      setUrl("");
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
        />
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
