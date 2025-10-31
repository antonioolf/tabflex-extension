// src/hooks/useGridConfig.js
import { useState, useEffect } from "react";

const STORAGE_KEYS = {
  GRID_COLUMNS: "tabflex_grid_columns",
  SHORTCUTS_ORDER: "tabflex_shortcuts_order",
};

export const useGridConfig = (initialShortcuts = []) => {
  const [columns, setColumns] = useState(4);
  const [shortcuts, setShortcuts] = useState(initialShortcuts);

  // Carregar configurações do localStorage na inicialização
  useEffect(() => {
    const savedColumns = localStorage.getItem(STORAGE_KEYS.GRID_COLUMNS);
    if (savedColumns) {
      setColumns(parseInt(savedColumns, 10));
    }

    const savedOrder = localStorage.getItem(STORAGE_KEYS.SHORTCUTS_ORDER);
    if (savedOrder && initialShortcuts.length > 0) {
      try {
        const orderIds = JSON.parse(savedOrder);
        // Reordenar shortcuts baseado na ordem salva
        const reorderedShortcuts = reorderByIds(initialShortcuts, orderIds);
        setShortcuts(reorderedShortcuts);
      } catch (error) {
        console.warn("Failed to parse saved shortcuts order:", error);
        setShortcuts(initialShortcuts);
      }
    } else {
      setShortcuts(initialShortcuts);
    }
  }, [initialShortcuts]);

  // Função auxiliar para reordenar array baseado em IDs
  const reorderByIds = (items, orderIds) => {
    const itemsMap = new Map(items.map((item) => [item.id, item]));
    const reordered = [];

    // Adicionar itens na ordem salva
    for (const id of orderIds) {
      if (itemsMap.has(id)) {
        reordered.push(itemsMap.get(id));
        itemsMap.delete(id);
      }
    }

    // Adicionar itens que não estavam na ordem salva (novos itens)
    itemsMap.forEach((item) => {
      reordered.push(item);
    });

    return reordered;
  };

  // Salvar número de colunas
  const saveColumns = (newColumns) => {
    setColumns(newColumns);
    localStorage.setItem(STORAGE_KEYS.GRID_COLUMNS, newColumns.toString());
  };

  // Salvar ordem dos shortcuts
  const saveShortcutsOrder = (newShortcuts) => {
    setShortcuts(newShortcuts);
    const orderIds = newShortcuts.map((shortcut) => shortcut.id);
    localStorage.setItem(
      STORAGE_KEYS.SHORTCUTS_ORDER,
      JSON.stringify(orderIds)
    );
  };

  // Atualizar shortcuts (quando adicionados/removidos/editados)
  const updateShortcuts = (newShortcuts) => {
    setShortcuts(newShortcuts);
    // Manter a ordem dos IDs existentes, adicionar novos no final
    const currentOrder = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.SHORTCUTS_ORDER) || "[]"
    );
    const newIds = newShortcuts.map((s) => s.id);

    // Filtrar IDs que ainda existem
    const existingIds = currentOrder.filter((id) => newIds.includes(id));

    // Adicionar novos IDs
    const addedIds = newIds.filter((id) => !currentOrder.includes(id));

    const updatedOrder = [...existingIds, ...addedIds];
    localStorage.setItem(
      STORAGE_KEYS.SHORTCUTS_ORDER,
      JSON.stringify(updatedOrder)
    );
  };

  return {
    columns,
    shortcuts,
    saveColumns,
    saveShortcutsOrder,
    updateShortcuts,
  };
};
