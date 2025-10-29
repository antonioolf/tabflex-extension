// src/components/SidebarWidgets.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { WbSunny, Cloud, CloudySnowing, Edit, Save } from "@mui/icons-material";

const SidebarWidgets = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notes, setNotes] = useState("Comprar leite");
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [weather] = useState({
    temp: 20,
    condition: "sunny",
    city: "São Paulo",
  });

  // Atualizar o relógio a cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "sunny":
        return <WbSunny sx={{ color: "warning.main" }} />;
      case "cloudy":
        return <Cloud sx={{ color: "action.active" }} />;
      case "snowy":
        return <CloudySnowing sx={{ color: "info.main" }} />;
      default:
        return <WbSunny sx={{ color: "warning.main" }} />;
    }
  };

  const handleNotesEdit = () => {
    if (isEditingNotes) {
      // Salvar as notas
      localStorage.setItem("tabflex-notes", notes);
    }
    setIsEditingNotes(!isEditingNotes);
  };

  // Carregar notas salvas
  useEffect(() => {
    const savedNotes = localStorage.getItem("tabflex-notes");
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        left: 32,
        top: "15%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 200,
      }}
    >
      {/* Widget de Relógio */}
      <Card
        sx={{
          bgcolor: "background.paper",
          backdropFilter: "blur(10px)",
          borderRadius: 4,
          boxShadow: (theme) => theme.shadows[8],
          border: 1,
          borderColor: "divider",
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              mb: 0.5,
            }}
          >
            {formatTime(currentTime)}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
            }}
          >
            São Paulo
          </Typography>
        </CardContent>
      </Card>

      {/* Widget de Clima */}
      <Card
        sx={{
          bgcolor: "background.paper",
          backdropFilter: "blur(10px)",
          borderRadius: 4,
          boxShadow: (theme) => theme.shadows[8],
          border: 1,
          borderColor: "divider",
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            {getWeatherIcon(weather.condition)}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              {weather.temp}°C
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
            }}
          >
            {weather.city}
          </Typography>
        </CardContent>
      </Card>

      {/* Widget de Notas Rápidas */}
      <Card
        sx={{
          bgcolor: "background.paper",
          backdropFilter: "blur(10px)",
          borderRadius: 4,
          boxShadow: (theme) => theme.shadows[8],
          border: 1,
          borderColor: "divider",
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              Quick Notes
            </Typography>
            <IconButton size="small" onClick={handleNotesEdit} sx={{ p: 0.5 }}>
              {isEditingNotes ? <Save /> : <Edit />}
            </IconButton>
          </Box>

          {isEditingNotes ? (
            <TextField
              fullWidth
              multiline
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: "0.875rem",
                },
              }}
            />
          ) : (
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                minHeight: "3em",
                whiteSpace: "pre-wrap",
              }}
            >
              {notes}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SidebarWidgets;
