// src/hooks/useChromeBookmarks.js
import { useState, useEffect } from "react";

export const useChromeBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar se estamos em uma extensão do Chrome
  // @ts-ignore
  const isChromeExtension =
    typeof window !== "undefined" && window.chrome && window.chrome.bookmarks;

  useEffect(() => {
    console.log("🔍 Debug - Verificando ambiente:");
    console.log("  window existe:", typeof window !== "undefined");
    console.log("  window.chrome existe:", window?.chrome !== undefined);
    console.log(
      "  chrome.bookmarks existe:",
      window?.chrome?.bookmarks !== undefined
    );
    console.log("  isChromeExtension:", isChromeExtension);

    if (isChromeExtension) {
      console.log("✅ Carregando bookmarks do Chrome...");
      loadChromeBookmarks();
      setupChromeListeners();
    } else {
      console.log("❌ API do Chrome não disponível");
      setError(
        "API do Chrome não disponível. Esta funcionalidade só funciona quando carregada como extensão do Chrome."
      );
      setLoading(false);
    }

    return () => {
      if (isChromeExtension) {
        removeChromeListeners();
      }
    };
  }, []);

  const loadChromeBookmarks = async () => {
    try {
      console.log("📚 Tentando carregar bookmarks do Chrome...");
      setLoading(true);
      setError(null);
      // @ts-ignore
      const tree = await window.chrome.bookmarks.getTree();
      console.log("📚 Árvore de bookmarks recebida:", tree);

      // Filtrar apenas as pastas principais que o usuário pode ver
      const userBookmarks = tree[0]?.children || [];
      console.log("📚 Bookmarks do usuário:", userBookmarks);

      setBookmarks(userBookmarks);
      console.log("✅ Bookmarks carregados com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao carregar bookmarks do Chrome:", error);
      setError("Erro ao carregar bookmarks do Chrome: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const setupChromeListeners = () => {
    if (!isChromeExtension) return;

    // @ts-ignore
    window.chrome.bookmarks.onCreated.addListener(handleBookmarkCreated);
    // @ts-ignore
    window.chrome.bookmarks.onRemoved.addListener(handleBookmarkRemoved);
    // @ts-ignore
    window.chrome.bookmarks.onChanged.addListener(handleBookmarkChanged);
    // @ts-ignore
    window.chrome.bookmarks.onMoved.addListener(handleBookmarkMoved);
  };

  const removeChromeListeners = () => {
    if (!isChromeExtension) return;

    // @ts-ignore
    window.chrome.bookmarks.onCreated.removeListener(handleBookmarkCreated);
    // @ts-ignore
    window.chrome.bookmarks.onRemoved.removeListener(handleBookmarkRemoved);
    // @ts-ignore
    window.chrome.bookmarks.onChanged.removeListener(handleBookmarkChanged);
    // @ts-ignore
    window.chrome.bookmarks.onMoved.removeListener(handleBookmarkMoved);
  };

  const handleBookmarkCreated = (id, bookmark) => {
    loadChromeBookmarks(); // Recarregar a árvore completa
  };

  const handleBookmarkRemoved = (id, removeInfo) => {
    loadChromeBookmarks(); // Recarregar a árvore completa
  };

  const handleBookmarkChanged = (id, changeInfo) => {
    loadChromeBookmarks(); // Recarregar a árvore completa
  };

  const handleBookmarkMoved = (id, moveInfo) => {
    loadChromeBookmarks(); // Recarregar a árvore completa
  };

  const addBookmark = async (bookmark, parentId = null) => {
    if (!isChromeExtension) {
      console.warn(
        "API do Chrome não disponível. Não é possível adicionar bookmark."
      );
      return;
    }

    try {
      // Se parentId não for fornecido, usar a pasta "Outros favoritos"
      if (!parentId) {
        // @ts-ignore
        const tree = await window.chrome.bookmarks.getTree();
        parentId = findOtherBookmarksFolder(tree)?.id || "2"; // "2" é geralmente "Outros favoritos"
      }

      // @ts-ignore
      await window.chrome.bookmarks.create({
        parentId: parentId,
        title: bookmark.title || bookmark.name,
        url: bookmark.url,
      });

      // Os listeners irão atualizar automaticamente
    } catch (error) {
      console.error("Erro ao adicionar bookmark:", error);
    }
  };

  const addFolder = async (folderName, parentId = null) => {
    if (!isChromeExtension) {
      console.warn(
        "API do Chrome não disponível. Não é possível adicionar pasta."
      );
      return;
    }

    try {
      if (!parentId) {
        // @ts-ignore
        const tree = await window.chrome.bookmarks.getTree();
        parentId = findOtherBookmarksFolder(tree)?.id || "2";
      }

      // @ts-ignore
      await window.chrome.bookmarks.create({
        parentId: parentId,
        title: folderName,
      });
    } catch (error) {
      console.error("Erro ao adicionar pasta:", error);
    }
  };

  const removeBookmark = async (id) => {
    if (!isChromeExtension) {
      console.warn(
        "API do Chrome não disponível. Não é possível remover bookmark."
      );
      return;
    }

    try {
      // Verificar se é uma pasta e usar removeTree se necessário
      // @ts-ignore
      const [bookmark] = await window.chrome.bookmarks.get(id);
      if (bookmark.children) {
        // @ts-ignore
        await window.chrome.bookmarks.removeTree(id);
      } else {
        // @ts-ignore
        await window.chrome.bookmarks.remove(id);
      }
    } catch (error) {
      console.error("Erro ao remover bookmark:", error);
    }
  };

  const editBookmark = async (id, updatedData) => {
    if (!isChromeExtension) {
      console.warn(
        "API do Chrome não disponível. Não é possível editar bookmark."
      );
      return;
    }

    try {
      const changes = {};
      if (updatedData.title || updatedData.name) {
        changes.title = updatedData.title || updatedData.name;
      }
      if (updatedData.url) {
        changes.url = updatedData.url;
      }

      // @ts-ignore
      await window.chrome.bookmarks.update(id, changes);
    } catch (error) {
      console.error("Erro ao editar bookmark:", error);
    }
  };

  // Função auxiliar para encontrar a pasta "Outros favoritos"
  const findOtherBookmarksFolder = (tree) => {
    for (const root of tree) {
      if (root.children) {
        for (const child of root.children) {
          if (
            child.title === "Other bookmarks" ||
            child.title === "Outros favoritos"
          ) {
            return child;
          }
        }
      }
    }
    return null;
  };

  // Função para obter pastas disponíveis (útil para o diálogo)
  const getAvailableFolders = () => {
    const folders = [];

    const extractFolders = (items) => {
      items.forEach((item) => {
        if (item.children) {
          // É uma pasta
          folders.push(item);
          extractFolders(item.children);
        }
      });
    };

    extractFolders(bookmarks);
    return folders;
  };

  return {
    bookmarks,
    loading,
    error: !isChromeExtension
      ? "Esta funcionalidade só está disponível quando executado como extensão do Chrome"
      : null,
    addBookmark,
    addFolder,
    removeBookmark,
    editBookmark,
    getAvailableFolders,
    isChromeExtension,
  };
};
