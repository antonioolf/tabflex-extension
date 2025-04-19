// src/hooks/useShortcuts.js
import { useState, useEffect } from "react";

export const useShortcuts = () => {
  const [shortcuts, setShortcuts] = useState([]);

  // Carrega os atalhos do localStorage ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem("tabflex-shortcuts");
    if (saved) {
      setShortcuts(JSON.parse(saved));
    } else {
      // Atalhos padrão
      const defaultShortcuts = [
        { id: 1, name: "YouTube", url: "https://www.youtube.com" },
        { id: 2, name: "Gmail", url: "https://mail.google.com" },
        { id: 3, name: "WhatsApp", url: "https://web.whatsapp.com" },
        { id: 4, name: "Wikipedia", url: "https://www.wikipedia.org" },
      ];
      setShortcuts(defaultShortcuts);
      localStorage.setItem(
        "tabflex-shortcuts",
        JSON.stringify(defaultShortcuts)
      );
    }
  }, []);

  const saveShortcuts = (newShortcuts) => {
    setShortcuts(newShortcuts);
    localStorage.setItem("tabflex-shortcuts", JSON.stringify(newShortcuts));
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

  return { shortcuts, addShortcut, editShortcut, removeShortcut };
};
