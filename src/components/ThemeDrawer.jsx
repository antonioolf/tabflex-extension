import { Drawer, Box, Typography } from "@mui/material";
import React from "react";

const ThemeDrawer = ({ open, onClose }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 250, p: 3 }}>
        <Typography variant="h6">Customização de Tema</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Aqui você poderá personalizar o tema da aplicação no futuro.
        </Typography>
      </Box>
    </Drawer>
  );
};

export default ThemeDrawer;
