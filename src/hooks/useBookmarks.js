// src/hooks/useBookmarks.js
import { useState, useEffect } from "react";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("tabflex-bookmarks");
    if (saved) {
      setBookmarks(JSON.parse(saved));
    } else {
      // Bookmarks padrão organizados em pastas
      const defaultBookmarks = [
        {
          id: 1,
          name: "Barra de favoritos",
          type: "folder",
          children: [
            {
              id: 2,
              name: "Google",
              type: "bookmark",
              url: "https://www.google.com",
              favicon: "https://www.google.com/favicon.ico",
            },
            {
              id: 3,
              name: "YouTube",
              type: "bookmark",
              url: "https://www.youtube.com",
              favicon: "https://www.youtube.com/favicon.ico",
            },
            {
              id: 4,
              name: "GitHub",
              type: "bookmark",
              url: "https://github.com",
              favicon: "https://github.com/favicon.ico",
            },
          ],
        },
        {
          id: 5,
          name: "Trabalho",
          type: "folder",
          children: [
            {
              id: 6,
              name: "Gmail",
              type: "bookmark",
              url: "https://mail.google.com",
              favicon: "https://mail.google.com/favicon.ico",
            },
            {
              id: 7,
              name: "Google Drive",
              type: "bookmark",
              url: "https://drive.google.com",
              favicon: "https://drive.google.com/favicon.ico",
            },
            {
              id: 8,
              name: "Desenvolvimento",
              type: "folder",
              children: [
                {
                  id: 9,
                  name: "Stack Overflow",
                  type: "bookmark",
                  url: "https://stackoverflow.com",
                  favicon: "https://stackoverflow.com/favicon.ico",
                },
                {
                  id: 10,
                  name: "MDN Web Docs",
                  type: "bookmark",
                  url: "https://developer.mozilla.org",
                  favicon: "https://developer.mozilla.org/favicon.ico",
                },
              ],
            },
          ],
        },
        {
          id: 11,
          name: "Entretenimento",
          type: "folder",
          children: [
            {
              id: 12,
              name: "Netflix",
              type: "bookmark",
              url: "https://www.netflix.com",
              favicon: "https://www.netflix.com/favicon.ico",
            },
            {
              id: 13,
              name: "Spotify",
              type: "bookmark",
              url: "https://open.spotify.com",
              favicon: "https://open.spotify.com/favicon.ico",
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
  }, []);

  const saveBookmarks = (newBookmarks) => {
    setBookmarks(newBookmarks);
    localStorage.setItem("tabflex-bookmarks", JSON.stringify(newBookmarks));
  };

  const addBookmark = (bookmark, folderId = null) => {
    const newBookmark = {
      ...bookmark,
      id: Date.now(),
      type: "bookmark",
      favicon: `${new URL(bookmark.url).origin}/favicon.ico`,
    };

    if (folderId) {
      // Adicionar a uma pasta específica
      const addToFolder = (items) => {
        return items.map((item) => {
          if (item.id === folderId && item.type === "folder") {
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
      saveBookmarks(addToFolder(bookmarks));
    } else {
      // Adicionar à raiz
      saveBookmarks([...bookmarks, newBookmark]);
    }
  };

  const addFolder = (folderName, parentId = null) => {
    const newFolder = {
      id: Date.now(),
      name: folderName,
      type: "folder",
      children: [],
    };

    if (parentId) {
      // Adicionar a uma pasta pai
      const addToParent = (items) => {
        return items.map((item) => {
          if (item.id === parentId && item.type === "folder") {
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
      saveBookmarks(addToParent(bookmarks));
    } else {
      // Adicionar à raiz
      saveBookmarks([...bookmarks, newFolder]);
    }
  };

  const removeBookmark = (id) => {
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
    saveBookmarks(removeFromItems(bookmarks));
  };

  const editBookmark = (id, updatedData) => {
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
    saveBookmarks(updateInItems(bookmarks));
  };

  return {
    bookmarks,
    addBookmark,
    addFolder,
    removeBookmark,
    editBookmark,
  };
};
