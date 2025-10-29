import {
  Folder,
  FolderOpen,
  Bookmark,
  MoreVert,
  ExpandLess,
  ExpandMore,
  OpenInNew,
  Launch,
  Tab,
  Search,
  Add,
  CreateNewFolder,
} from "@mui/icons-material";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  Collapse,
  Avatar,
  Divider,
  Tooltip,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useChromeBookmarks } from "../hooks/useChromeBookmarks";
import BookmarkDialog from "./BookmarkDialog";

const BookmarkItem = ({
  item,
  level = 0,
  onOpenBookmark,
  onEdit,
  onDelete,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleBookmarkClick = () => {
    if (item.url) {
      // É um bookmark (tem URL)
      onOpenBookmark(item.url, "current");
    } else if (item.children) {
      // É uma pasta (tem children)
      setExpanded(!expanded);
    }
  };

  const handleOpenInNewTab = () => {
    onOpenBookmark(item.url, "new-tab");
    handleMenuClose();
  };

  const handleOpenInNewWindow = () => {
    onOpenBookmark(item.url, "new-window");
    handleMenuClose();
  };

  const handleOpenInIncognito = () => {
    onOpenBookmark(item.url, "incognito");
    handleMenuClose();
  };

  const handleEdit = () => {
    onEdit(item);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete(item.id);
    handleMenuClose();
  };

  const handleOpenAllInNewTabs = () => {
    // Abrir todos os bookmarks da pasta em novas abas
    const openAllBookmarks = (items) => {
      items.forEach((childItem) => {
        if (childItem.url) {
          // É um bookmark
          window.open(childItem.url, "_blank");
        } else if (childItem.children) {
          // É uma pasta
          openAllBookmarks(childItem.children);
        }
      });
    };

    if (item.children) {
      openAllBookmarks(item.children);
    }
    handleMenuClose();
  };

  const handleOpenAllInNewWindow = () => {
    // Abrir todos os bookmarks da pasta em uma nova janela
    const getAllUrls = (items) => {
      let urls = [];
      items.forEach((childItem) => {
        if (childItem.url) {
          // É um bookmark
          urls.push(childItem.url);
        } else if (childItem.children) {
          // É uma pasta
          urls = urls.concat(getAllUrls(childItem.children));
        }
      });
      return urls;
    };

    if (item.children) {
      const urls = getAllUrls(item.children);
      if (urls.length > 0) {
        // Abrir primeira URL em nova janela
        const newWindow = window.open(
          urls[0],
          "_blank",
          "width=1200,height=800"
        );
        // Abrir demais URLs como abas na mesma janela
        urls.slice(1).forEach((url) => {
          window.open(url, "_blank");
        });
      }
    }
    handleMenuClose();
  };

  if (item.children) {
    // É uma pasta
    return (
      <>
        <ListItem
          disablePadding
          sx={{
            pl: level * 2,
            "&:hover .more-options": {
              visibility: "visible",
            },
          }}
        >
          <ListItemButton onClick={handleBookmarkClick} sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              {expanded ? <FolderOpen /> : <Folder />}
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              primaryTypographyProps={{ fontSize: "0.9rem" }}
            />
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <IconButton
            size="small"
            onClick={handleMenuClick}
            className="more-options"
            sx={{
              visibility: "hidden",
              mr: 1,
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <MoreVert fontSize="small" />
          </IconButton>
        </ListItem>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children?.map((child) => (
              <BookmarkItem
                key={child.id}
                item={child}
                level={level + 1}
                onOpenBookmark={onOpenBookmark}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </List>
        </Collapse>
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          onClick={(e) => e.stopPropagation()}
        >
          <MenuItem onClick={handleOpenAllInNewTabs}>
            <ListItemIcon>
              <Tab fontSize="small" />
            </ListItemIcon>
            <ListItemText>Abrir todos (nova aba)</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleOpenAllInNewWindow}>
            <ListItemIcon>
              <Launch fontSize="small" />
            </ListItemIcon>
            <ListItemText>Abrir todos (nova janela)</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleEdit}>
            <ListItemText>Editar...</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemText>Excluir</ListItemText>
          </MenuItem>
        </Menu>
      </>
    );
  }

  return (
    <>
      <ListItem
        disablePadding
        sx={{
          pl: level * 2,
          "&:hover .more-options": {
            visibility: "visible",
          },
        }}
      >
        <ListItemButton onClick={handleBookmarkClick} sx={{ py: 0.5 }}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            <Avatar
              src={
                item.url ? `${new URL(item.url).origin}/favicon.ico` : undefined
              }
              sx={{ width: 16, height: 16 }}
              variant="square"
            >
              <Bookmark fontSize="small" />
            </Avatar>
          </ListItemIcon>
          <ListItemText
            primary={item.title}
            primaryTypographyProps={{ fontSize: "0.9rem" }}
          />
        </ListItemButton>
        <IconButton
          size="small"
          onClick={handleMenuClick}
          className="more-options"
          sx={{
            visibility: "hidden",
            mr: 1,
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <MoreVert fontSize="small" />
        </IconButton>
      </ListItem>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={handleOpenInNewTab}>
          <ListItemIcon>
            <Tab fontSize="small" />
          </ListItemIcon>
          <ListItemText>Abrir em nova aba</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleOpenInNewWindow}>
          <ListItemIcon>
            <Launch fontSize="small" />
          </ListItemIcon>
          <ListItemText>Abrir em nova janela</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleOpenInIncognito}>
          <ListItemIcon>
            <Search fontSize="small" />
          </ListItemIcon>
          <ListItemText>Abrir em janela anônima</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleEdit}>
          <ListItemText>Editar...</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemText>Excluir</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

const BookmarkDrawer = ({ open, onClose }) => {
  const {
    bookmarks,
    loading,
    error,
    addBookmark,
    addFolder,
    removeBookmark,
    editBookmark,
    isChromeExtension,
  } = useChromeBookmarks();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("bookmark");
  const [editingItem, setEditingItem] = useState(null);

  const handleOpenBookmark = (url, mode) => {
    switch (mode) {
      case "current":
        window.location.href = url;
        break;
      case "new-tab":
        window.open(url, "_blank");
        break;
      case "new-window":
        window.open(url, "_blank", "width=1200,height=800");
        break;
      case "incognito":
        // Em uma extensão real, usaríamos chrome.windows.create com incognito: true
        // Para este exemplo, abrimos em nova janela
        window.open(url, "_blank", "width=1200,height=800");
        break;
      default:
        window.open(url, "_blank");
    }
    onClose();
  };

  const handleAddBookmark = () => {
    setEditingItem(null);
    setDialogType("bookmark");
    setDialogOpen(true);
  };

  const handleAddFolder = () => {
    setEditingItem(null);
    setDialogType("folder");
    setDialogOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setDialogType(item.url ? "bookmark" : "folder");
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      removeBookmark(id);
    }
  };

  const handleSave = (data, folderId) => {
    if (editingItem) {
      // Editando item existente
      if (editingItem.url) {
        // É um bookmark
        editBookmark(editingItem.id, {
          title: data.title || data.name,
          url: data.url,
        });
      } else {
        // É uma pasta
        editBookmark(editingItem.id, { title: data.title || data });
      }
    } else {
      // Criando novo item
      if (dialogType === "bookmark") {
        addBookmark(data, folderId);
      } else {
        addFolder(data, folderId);
      }
    }
  };

  return (
    <>
      <Drawer anchor="left" open={open} onClose={onClose}>
        <Box sx={{ width: 320 }}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
            >
              <Bookmark />
              Gerenciador de Favoritos
            </Typography>

            {isChromeExtension && (
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  color: "success.main",
                  mb: 2,
                  fontWeight: 500,
                }}
              >
                🔗 Conectado aos favoritos do Chrome
              </Typography>
            )}

            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Add />}
                onClick={handleAddBookmark}
                fullWidth
                disabled={!isChromeExtension}
              >
                Favorito
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<CreateNewFolder />}
                onClick={handleAddFolder}
                fullWidth
                disabled={!isChromeExtension}
              >
                Pasta
              </Button>
            </Stack>
          </Box>

          <Box sx={{ height: "calc(100vh - 160px)", overflow: "auto" }}>
            {error ? (
              <Box
                sx={{
                  p: 3,
                  textAlign: "center",
                  color: "warning.main",
                }}
              >
                <Typography variant="body2" sx={{ mb: 2 }}>
                  ⚠️ {error}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Para acessar seus favoritos do Chrome, carregue esta aplicação
                  como extensão.
                </Typography>
              </Box>
            ) : loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                }}
              >
                <CircularProgress size={40} />
              </Box>
            ) : (
              <List dense>
                {bookmarks.map((item) => (
                  <BookmarkItem
                    key={item.id}
                    item={item}
                    onOpenBookmark={handleOpenBookmark}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </List>
            )}
          </Box>
        </Box>
      </Drawer>

      <BookmarkDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSave}
        type={dialogType}
        folders={bookmarks}
        editingItem={editingItem}
      />
    </>
  );
};

export default BookmarkDrawer;
