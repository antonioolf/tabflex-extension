import { Drawer, Box, Typography } from "@mui/material";
import React from "react";

const BookmarkDrawer = ({ open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 250, p: 3 }}>
        <Typography variant="h6">Bookmarks</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Aqui serão exibidos seus bookmarks no futuro.
        </Typography>
      </Box>
    </Drawer>
  );
};

export default BookmarkDrawer;
