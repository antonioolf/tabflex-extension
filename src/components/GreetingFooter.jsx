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

    // Listener para mudanças no localStorage
    const handleStorageChange = (e) => {
      if (e.key === "tabflex-user-name") {
        setUserName(e.newValue || "Usuário");
      }
    };

    // Adicionar listener para mudanças no localStorage de outras abas/componentes
    window.addEventListener("storage", handleStorageChange);

    // Função para detectar mudanças no localStorage da mesma aba
    const checkUserName = () => {
      const currentUserName = localStorage.getItem("tabflex-user-name");
      if (currentUserName && currentUserName !== userName) {
        setUserName(currentUserName);
      }
    };

    // Verificar mudanças no localStorage a cada segundo (para mesma aba)
    const userNameChecker = setInterval(checkUserName, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(userNameChecker);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [userName]);

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
