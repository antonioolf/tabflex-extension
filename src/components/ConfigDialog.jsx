// src/components/ConfigDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Slider,
  Box,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const ConfigDialog = ({ open, onClose, columns, onColumnsChange, onSave }) => {
  const handleSliderChange = (event, newValue) => {
    onColumnsChange(newValue);
  };

  const handleSave = () => {
    onSave();
    onClose();
  };

  const marks = [
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          backdropFilter: "blur(10px)",
          bgcolor: "background.paper",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography variant="h6" component="div" fontWeight={600}>
          Configurações do Grid
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: "text.secondary",
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" fontWeight={500} sx={{ mb: 2 }}>
            Número de colunas
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Escolha quantas colunas deseja exibir no grid de aplicativos
          </Typography>

          <Box sx={{ px: 2 }}>
            <Slider
              value={columns}
              onChange={handleSliderChange}
              step={1}
              marks={marks}
              min={2}
              max={6}
              valueLabelDisplay="auto"
              sx={{
                "& .MuiSlider-thumb": {
                  height: 20,
                  width: 20,
                  backgroundColor: "primary.main",
                  "&:hover": {
                    boxShadow: "0px 0px 0px 8px rgba(25, 118, 210, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  height: 4,
                  borderRadius: 2,
                },
                "& .MuiSlider-rail": {
                  height: 4,
                  borderRadius: 2,
                  opacity: 0.3,
                },
                "& .MuiSlider-mark": {
                  height: 8,
                  width: 2,
                  borderRadius: 1,
                },
                "& .MuiSlider-markActive": {
                  backgroundColor: "primary.main",
                },
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            bgcolor: "grey.50",
            borderRadius: 2,
            p: 2,
            border: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Preview: {columns} colunas
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gap: 1,
              mt: 1,
            }}
          >
            {Array.from({ length: Math.min(8, columns * 2) }).map(
              (_, index) => (
                <Box
                  key={index}
                  sx={{
                    aspectRatio: "1",
                    bgcolor: "primary.light",
                    borderRadius: 1,
                    opacity: 0.7,
                  }}
                />
              )
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            },
          }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfigDialog;
