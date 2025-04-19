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
        { id: 1, name: "Play Console", url: "https://play.google.com/console" },
        { id: 2, name: "DeepSeek", url: "https://www.deepseek.com" },
        { id: 3, name: "Supabase", url: "https://supabase.com" },
        { id: 4, name: "Admob", url: "https://admob.google.com" },
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
    debugger;
    const newShortcuts = shortcuts.filter((s) => s.id !== id);
    saveShortcuts(newShortcuts);
  };

  return { shortcuts, addShortcut, editShortcut, removeShortcut };
};
