// src/components/GreetingFooter.jsx
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const GreetingFooter = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [userName, setUserName] = useState("Usuário");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // Atualizar a cada minuto

    // Carregar o nome do usuário do localStorage
    const savedUserName = localStorage.getItem("tabflex-user-name");
    if (savedUserName) {
      setUserName(savedUserName);
    }

    return () => clearInterval(timer);
  }, []);

  const getGreeting = (hour) => {
    if (hour < 12) {
      return "Bom dia";
    } else if (hour < 18) {
      return "Boa tarde";
    } else {
      return "Boa noite";
    }
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };

    return date.toLocaleDateString("pt-BR", options);
  };

  const currentHour = currentDateTime.getHours();
  const greeting = getGreeting(currentHour);
  const formattedDate = formatDate(currentDateTime);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 32,
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          fontSize: "1rem",
          fontWeight: 400,
        }}
      >
        {formattedDate}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: "text.primary",
          fontSize: "1.1rem",
          fontWeight: 500,
          mt: 0.5,
        }}
      >
        {greeting}, {userName} 👋
      </Typography>
    </Box>
  );
};

export default GreetingFooter;
