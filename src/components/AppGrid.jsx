// src/components/AppGrid.jsx
import React, { useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Grid,
} from "@mui/material";
import { Add, MoreVert, DragIndicator } from "@mui/icons-material";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const AppGrid = ({
  shortcuts,
  onAdd,
  onEdit,
  onRemove,
  onReorder,
  columns = 4,
}) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = shortcuts.findIndex((item) => item.id === active.id);
      const newIndex = shortcuts.findIndex((item) => item.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(shortcuts, oldIndex, newIndex);
        onReorder(newOrder);
      }
    }
  };

  // Componente para app card arrastável
  const SortableAppCard = ({ app }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: app.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <Grid
        size={{
          xs: 12 / Math.min(columns, 4),
          sm: 12 / Math.min(columns, 6),
          md: 12 / columns,
        }}
      >
        <Card
          ref={setNodeRef}
          style={style}
          sx={{
            borderRadius: 3,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: isDragging ? undefined : "translateY(-2px)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            },
            height: 80,
            bgcolor: "background.paper",
            position: "relative",
            cursor: isDragging ? "grabbing" : "grab",
            "& .shortcut-menu-button": {
              display: "none",
            },
            "&:hover .shortcut-menu-button": {
              display: "flex",
            },
          }}
        >
          <CardActionArea
            onClick={() => !isDragging && handleAppClick(app.url)}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 1,
            }}
          >
            <Box
              {...attributes}
              {...listeners}
              sx={{
                position: "absolute",
                top: 4,
                left: 4,
                color: "text.secondary",
                cursor: "grab",
                "&:active": {
                  cursor: "grabbing",
                },
              }}
            >
              <DragIndicator fontSize="small" />
            </Box>

            <Avatar
              src={app.customIcon || getIcon(app.url)}
              sx={{
                width: 32,
                height: 32,
                bgcolor: stringToColor(app.name),
                mb: 0.5,
              }}
              imgProps={{
                onError: (e) => {
                  const target = e.target;
                  if (target instanceof HTMLImageElement) {
                    target.style.display = "none";
                  }
                },
              }}
            >
              {app.name.charAt(0)}
            </Avatar>
            <Typography
              variant="caption"
              sx={{
                textAlign: "center",
                color: "text.primary",
                fontWeight: 500,
                fontSize: "0.65rem",
                lineHeight: 1,
              }}
            >
              {app.name}
            </Typography>

            {/* Menu Button */}
            <IconButton
              className="shortcut-menu-button"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleMenuClick(e, app);
              }}
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                bgcolor: "background.paper",
                color: "text.primary",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <MoreVert fontSize="small" />
            </IconButton>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };

  const handleAppClick = (url) => {
    window.open(url, "_self");
  };

  const handleMenuClick = (event, app) => {
    event.preventDefault();
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setSelectedApp(app);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedApp(null);
  };

  const handleEdit = () => {
    if (selectedApp) {
      onEdit(selectedApp);
    }
    handleMenuClose();
  };

  const handleRemove = () => {
    if (selectedApp) {
      onRemove(selectedApp.id);
    }
    handleMenuClose();
  };

  const getIcon = (url) => {
    try {
      const domain = new URL(url).hostname.replace("www.", "");
      return `https://www.google.com/s2/favicons?sz=64&domain_url=${domain}`;
    } catch {
      return null;
    }
  };

  // Função para gerar cor baseada no nome
  const stringToColor = (string) => {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  // Botão "Add Site"
  const AddButton = () => (
    <Grid
      size={{
        xs: 12 / Math.min(columns, 4),
        sm: 12 / Math.min(columns, 6),
        md: 12 / columns,
      }}
    >
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          },
          height: 80,
          bgcolor: "grey.100",
        }}
      >
        <CardActionArea
          onClick={onAdd}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 1,
          }}
        >
          <Add sx={{ fontSize: 32, color: "text.secondary", mb: 0.5 }} />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: "0.65rem" }}
          >
            Add Site
          </Typography>
        </CardActionArea>
      </Card>
    </Grid>
  );

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", md: 800 },
          mx: "auto",
        }}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <Grid container spacing={2} columns={12}>
            <SortableContext
              items={shortcuts?.map((app) => app.id) || []}
              strategy={rectSortingStrategy}
            >
              {shortcuts?.map((app) => (
                <SortableAppCard key={app.id} app={app} />
              ))}
            </SortableContext>
            <AddButton />
          </Grid>
        </DndContext>
      </Box>

      {/* Context Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleEdit}>
          <Typography>Edit</Typography>
        </MenuItem>
        <MenuItem onClick={handleRemove}>
          <Typography>Remove</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AppGrid;
