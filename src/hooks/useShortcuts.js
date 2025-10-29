// src/hooks/useShortcuts.js
import { useState, useEffect } from "react";

export const useShortcuts = () => {
  const [shortcuts, setShortcuts] = useState([]);

  const [headerShortcuts, setHeaderShortcuts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("tabflex-shortcuts");
    if (saved) {
      const parsed = JSON.parse(saved);
      setShortcuts(parsed.filter((s) => s.type !== "header"));
      setHeaderShortcuts(parsed.filter((s) => s.type === "header"));
    } else {
      // Atalhos padrão
      const defaultShortcuts = [
        { id: 1, name: "Play Console", url: "https://play.google.com/console" },
        { id: 2, name: "ChatGpt", url: "https://chat.openai.com" },
        { id: 3, name: "Gemini", url: "https://gemini.google.com" },
        { id: 4, name: "Firebase", url: "https://console.firebase.google.com" },
        { id: 5, name: "Manus", url: "https://manus.ai" },
        { id: 6, name: "DeepSeek", url: "https://deepseek.ai" },
        { id: 7, name: "Supabase", url: "https://app.supabase.com" },
        { id: 8, name: "Admob", url: "https://apps.admob.com" },
        { id: 9, name: "Google Ads", url: "https://ads.google.com" },
        { id: 10, name: "Workana", url: "https://www.workana.com" },
        { id: 11, name: "YouTube", url: "https://www.youtube.com" },
        { id: 12, name: "Gmail", url: "https://mail.google.com" },
        { id: 13, name: "WhatsApp", url: "https://web.whatsapp.com" },
        { id: 14, name: "Wikipedia", url: "https://www.wikipedia.org" },
      ];

      // Header shortcuts padrão
      const defaultHeaderShortcuts = [
        {
          id: 101,
          name: "Gmail",
          url: "https://mail.google.com",
          type: "header",
          fixed: true,
        },
        {
          id: 102,
          name: "Images",
          url: "https://images.google.com",
          type: "header",
          fixed: true,
        },
        {
          id: 103,
          name: "Translate",
          url: "https://translate.google.com",
          type: "header",
          fixed: true,
        },
        {
          id: 104,
          name: "YouTube",
          url: "https://www.youtube.com",
          type: "header",
          fixed: false,
        },
        {
          id: 105,
          name: "Drive",
          url: "https://drive.google.com",
          type: "header",
          fixed: false,
        },
        {
          id: 106,
          name: "Maps",
          url: "https://maps.google.com",
          type: "header",
          fixed: false,
        },
      ];

      const allShortcuts = [...defaultShortcuts, ...defaultHeaderShortcuts];
      setShortcuts(defaultShortcuts);
      setHeaderShortcuts(defaultHeaderShortcuts);
      localStorage.setItem("tabflex-shortcuts", JSON.stringify(allShortcuts));
    }
  }, []);

  const saveAllShortcuts = (regularShorts, headerShorts) => {
    const allShortcuts = [...regularShorts, ...headerShorts];
    setShortcuts(regularShorts);
    setHeaderShortcuts(headerShorts);
    localStorage.setItem("tabflex-shortcuts", JSON.stringify(allShortcuts));
  };

  const addHeaderShortcut = (shortcut) => {
    const newHeaderShortcuts = [
      ...headerShortcuts,
      { ...shortcut, id: Date.now(), type: "header" },
    ];
    saveAllShortcuts(shortcuts, newHeaderShortcuts);
  };

  const toggleHeaderFixed = (id) => {
    const newHeaderShortcuts = headerShortcuts.map((s) =>
      s.id === id ? { ...s, fixed: !s.fixed } : s
    );
    saveAllShortcuts(shortcuts, newHeaderShortcuts);
  };

  const saveShortcuts = (newShortcuts) => {
    setShortcuts(newShortcuts);
    saveAllShortcuts(newShortcuts, headerShortcuts);
  };

  const addShortcut = (shortcut) => {
    const newShortcuts = [...shortcuts, { ...shortcut, id: Date.now() }];
    saveShortcuts(newShortcuts);
  };

  const editShortcut = (id, updatedShortcut) => {
    const newShortcuts = shortcuts.map((s) =>
      s.id === id ? { ...updatedShortcut, id } : s
    );
    saveShortcuts(newShortcuts);
  };

  const removeShortcut = (id) => {
    const newShortcuts = shortcuts.filter((s) => s.id !== id);
    saveShortcuts(newShortcuts);
  };

  return {
    shortcuts,
    headerShortcuts,
    addShortcut,
    editShortcut,
    removeShortcut,
    addHeaderShortcut,
    toggleHeaderFixed,
  };
};
