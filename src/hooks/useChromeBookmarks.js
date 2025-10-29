// src/hooks/useChromeBookmarks.js
import { useState, useEffect } from "react";

export const useChromeBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

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
      console.log("⚠️ API do Chrome não disponível, usando fallback...");
      loadFallbackBookmarks();
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
      loadFallbackBookmarks();
    } finally {
      setLoading(false);
    }
  };

  const loadFallbackBookmarks = () => {
    const saved = localStorage.getItem("tabflex-bookmarks");
    if (saved) {
      setBookmarks(JSON.parse(saved));
    } else {
      // Bookmarks padrão organizados em pastas (fallback)
      const defaultBookmarks = [
        {
          id: "1",
          title: "Barra de favoritos",
          children: [
            {
              id: "2",
              title: "Google",
              url: "https://www.google.com",
            },
            {
              id: "3",
              title: "YouTube",
              url: "https://www.youtube.com",
            },
            {
              id: "4",
              title: "GitHub",
              url: "https://github.com",
            },
          ],
        },
        {
          id: "5",
          title: "Trabalho",
          children: [
            {
              id: "6",
              title: "Gmail",
              url: "https://mail.google.com",
            },
            {
              id: "7",
              title: "Google Drive",
              url: "https://drive.google.com",
            },
            {
              id: "8",
              title: "Desenvolvimento",
              children: [
                {
                  id: "9",
                  title: "Stack Overflow",
                  url: "https://stackoverflow.com",
                },
                {
                  id: "10",
                  title: "MDN Web Docs",
                  url: "https://developer.mozilla.org",
                },
              ],
            },
          ],
        },
      ];

      setBookmarks(defaultBookmarks);
      localStorage.setItem(
        "tabflex-bookmarks",
        JSON.stringify(defaultBookmarks)
      );
    }
    setLoading(false);
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
    if (isChromeExtension) {
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
    } else {
      // Fallback para localStorage
      addBookmarkFallback(bookmark, parentId);
    }
  };

  const addFolder = async (folderName, parentId = null) => {
    if (isChromeExtension) {
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
    } else {
      addFolderFallback(folderName, parentId);
    }
  };

  const removeBookmark = async (id) => {
    if (isChromeExtension) {
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
    } else {
      removeBookmarkFallback(id);
    }
  };

  const editBookmark = async (id, updatedData) => {
    if (isChromeExtension) {
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
    } else {
      editBookmarkFallback(id, updatedData);
    }
  };

  // Funções auxiliares para localStorage (fallback)
  const addBookmarkFallback = (bookmark, parentId) => {
    const newBookmark = {
      ...bookmark,
      id: Date.now().toString(),
      title: bookmark.title || bookmark.name,
    };

    if (parentId) {
      const addToFolder = (items) => {
        return items.map((item) => {
          if (item.id === parentId && item.children) {
            return {
              ...item,
              children: [...(item.children || []), newBookmark],
            };
          } else if (item.children) {
            return {
              ...item,
              children: addToFolder(item.children),
            };
          }
          return item;
        });
      };
      const updatedBookmarks = addToFolder(bookmarks);
      setBookmarks(updatedBookmarks);
      localStorage.setItem(
        "tabflex-bookmarks",
        JSON.stringify(updatedBookmarks)
      );
    } else {
      const updatedBookmarks = [...bookmarks, newBookmark];
      setBookmarks(updatedBookmarks);
      localStorage.setItem(
        "tabflex-bookmarks",
        JSON.stringify(updatedBookmarks)
      );
    }
  };

  const addFolderFallback = (folderName, parentId) => {
    const newFolder = {
      id: Date.now().toString(),
      title: folderName,
      children: [],
    };

    if (parentId) {
      const addToParent = (items) => {
        return items.map((item) => {
          if (item.id === parentId && item.children) {
            return {
              ...item,
              children: [...(item.children || []), newFolder],
            };
          } else if (item.children) {
            return {
              ...item,
              children: addToParent(item.children),
            };
          }
          return item;
        });
      };
      const updatedBookmarks = addToParent(bookmarks);
      setBookmarks(updatedBookmarks);
      localStorage.setItem(
        "tabflex-bookmarks",
        JSON.stringify(updatedBookmarks)
      );
    } else {
      const updatedBookmarks = [...bookmarks, newFolder];
      setBookmarks(updatedBookmarks);
      localStorage.setItem(
        "tabflex-bookmarks",
        JSON.stringify(updatedBookmarks)
      );
    }
  };

  const removeBookmarkFallback = (id) => {
    const removeFromItems = (items) => {
      return items.filter((item) => {
        if (item.id === id) {
          return false;
        }
        if (item.children) {
          item.children = removeFromItems(item.children);
        }
        return true;
      });
    };
    const updatedBookmarks = removeFromItems(bookmarks);
    setBookmarks(updatedBookmarks);
    localStorage.setItem("tabflex-bookmarks", JSON.stringify(updatedBookmarks));
  };

  const editBookmarkFallback = (id, updatedData) => {
    const updateInItems = (items) => {
      return items.map((item) => {
        if (item.id === id) {
          return { ...item, ...updatedData };
        }
        if (item.children) {
          return {
            ...item,
            children: updateInItems(item.children),
          };
        }
        return item;
      });
    };
    const updatedBookmarks = updateInItems(bookmarks);
    setBookmarks(updatedBookmarks);
    localStorage.setItem("tabflex-bookmarks", JSON.stringify(updatedBookmarks));
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
    addBookmark,
    addFolder,
    removeBookmark,
    editBookmark,
    getAvailableFolders,
    isChromeExtension,
  };
};
