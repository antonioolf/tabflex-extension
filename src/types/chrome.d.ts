// src/types/chrome.d.ts
declare global {
  interface Window {
    chrome?: typeof chrome;
  }
}

declare namespace chrome {
  namespace bookmarks {
    interface BookmarkTreeNode {
      id: string;
      parentId?: string;
      index?: number;
      url?: string;
      title: string;
      dateAdded?: number;
      dateGroupModified?: number;
      children?: BookmarkTreeNode[];
    }

    interface CreateDetails {
      parentId?: string;
      index?: number;
      title?: string;
      url?: string;
    }

    function getTree(): Promise<BookmarkTreeNode[]>;
    function get(idOrIdList: string | string[]): Promise<BookmarkTreeNode[]>;
    function getChildren(id: string): Promise<BookmarkTreeNode[]>;
    function create(bookmark: CreateDetails): Promise<BookmarkTreeNode>;
    function update(
      id: string,
      changes: { title?: string; url?: string }
    ): Promise<BookmarkTreeNode>;
    function remove(id: string): Promise<void>;
    function removeTree(id: string): Promise<void>;
    function search(
      query: string | { query?: string; url?: string; title?: string }
    ): Promise<BookmarkTreeNode[]>;
    function move(
      id: string,
      destination: { parentId?: string; index?: number }
    ): Promise<BookmarkTreeNode>;

    namespace onCreated {
      function addListener(
        callback: (id: string, bookmark: BookmarkTreeNode) => void
      ): void;
      function removeListener(
        callback: (id: string, bookmark: BookmarkTreeNode) => void
      ): void;
    }

    namespace onRemoved {
      function addListener(
        callback: (
          id: string,
          removeInfo: {
            parentId: string;
            index: number;
            node: BookmarkTreeNode;
          }
        ) => void
      ): void;
      function removeListener(
        callback: (
          id: string,
          removeInfo: {
            parentId: string;
            index: number;
            node: BookmarkTreeNode;
          }
        ) => void
      ): void;
    }

    namespace onChanged {
      function addListener(
        callback: (
          id: string,
          changeInfo: { title: string; url?: string }
        ) => void
      ): void;
      function removeListener(
        callback: (
          id: string,
          changeInfo: { title: string; url?: string }
        ) => void
      ): void;
    }

    namespace onMoved {
      function addListener(
        callback: (
          id: string,
          moveInfo: {
            parentId: string;
            oldParentId: string;
            index: number;
            oldIndex: number;
          }
        ) => void
      ): void;
      function removeListener(
        callback: (
          id: string,
          moveInfo: {
            parentId: string;
            oldParentId: string;
            index: number;
            oldIndex: number;
          }
        ) => void
      ): void;
    }
  }
}

export {};
