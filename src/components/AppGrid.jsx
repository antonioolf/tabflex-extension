// src/components/AppGrid.jsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  Avatar,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import {
  Add,
  YouTube,
  Facebook,
  Instagram,
  WhatsApp,
  LinkedIn,
  Twitter,
  GitHub,
  Reddit,
} from '@mui/icons-material';

const AppGrid = () => {
  const [apps, setApps] = useState([
    { id: 1, name: 'YouTube', url: 'https://youtube.com', icon: 'https://www.youtube.com/favicon.ico', color: '#ff0000' },
    { id: 2, name: 'Spotify', url: 'https://open.spotify.com', icon: 'https://open.spotify.com/favicon.ico', color: '#1db954' },
    { id: 3, name: 'Gmail', url: 'https://mail.google.com', icon: 'https://mail.google.com/favicon.ico', color: '#ea4335' },
    { id: 4, name: 'Instagram', url: 'https://instagram.com', icon: 'https://instagram.com/favicon.ico', color: '#e4405f' },
    { id: 5, name: 'Netflix', url: 'https://netflix.com', icon: 'https://netflix.com/favicon.ico', color: '#e50914' },
    { id: 6, name: 'Amazon', url: 'https://amazon.com', icon: 'https://amazon.com/favicon.ico', color: '#ff9900' },
    { id: 7, name: 'WhatsApp', url: 'https://web.whatsapp.com', icon: 'https://web.whatsapp.com/favicon.ico', color: '#25d366' },
    { id: 8, name: 'Discord', url: 'https://discord.com', icon: 'https://discord.com/favicon.ico', color: '#5865f2' },
    { id: 9, name: 'Facebook', url: 'https://facebook.com', icon: 'https://facebook.com/favicon.ico', color: '#1877f2' },
    { id: 10, name: 'Reddit', url: 'https://reddit.com', icon: 'https://reddit.com/favicon.ico', color: '#ff4500' },
    { id: 11, name: 'Proxer', url: 'https://proxer.me', icon: 'https://proxer.me/favicon.ico', color: '#6441a5' },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newApp, setNewApp] = useState({ name: '', url: '' });

  const handleAppClick = (url) => {
    window.open(url, '_blank');
  };

  const handleAddApp = () => {
    setDialogOpen(true);
  };

  const handleSaveApp = () => {
    if (newApp.name && newApp.url) {
      const app = {
        id: Date.now(),
        name: newApp.name,
        url: newApp.url.startsWith('http') ? newApp.url : `https://${newApp.url}`,
        icon: `${new URL(newApp.url.startsWith('http') ? newApp.url : `https://${newApp.url}`).origin}/favicon.ico`,
        color: '#1976d2',
      };
      setApps([...apps.slice(0, -1), app, apps[apps.length - 1]]);
      setNewApp({ name: '', url: '' });
      setDialogOpen(false);
    }
  };

  const AppCard = ({ app, isAddButton = false }) => (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        },
        height: 80,
        width: 80,
        bgcolor: isAddButton ? 'grey.100' : 'background.paper',
      }}
    >
      <CardActionArea
        onClick={isAddButton ? handleAddApp : () => handleAppClick(app.url)}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 1,
        }}
      >
        {isAddButton ? (
          <>
            <Add sx={{ fontSize: 32, color: 'text.secondary', mb: 0.5 }} />
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
              Add Site
            </Typography>
          </>
        ) : (
          <>
            <Avatar
              src={app.icon}
              sx={{
                width: 32,
                height: 32,
                bgcolor: app.color,
                mb: 0.5,
              }}
              imgProps={{
                onError: (e) => {
                  const target = e.target;
                  if (target instanceof HTMLImageElement) {
                    target.style.display = 'none';
                  }
                },
              }}
            >
              {app.name.charAt(0)}
            </Avatar>
            <Typography
              variant="caption"
              sx={{
                textAlign: 'center',
                color: 'text.primary',
                fontWeight: 500,
                fontSize: '0.65rem',
                lineHeight: 1,
              }}
            >
              {app.name}
            </Typography>
          </>
        )}
      </CardActionArea>
    </Card>
  );

  return (
    <>
      <Box
        sx={{
          width: '100%',
          maxWidth: 360,
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
          }}
        >
          {apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
          <AppCard isAddButton app={null} />
        </Box>
      </Box>

      {/* Dialog para adicionar novo app */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Site</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Site Name"
            fullWidth
            variant="outlined"
            value={newApp.name}
            onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Site URL"
            fullWidth
            variant="outlined"
            value={newApp.url}
            onChange={(e) => setNewApp({ ...newApp, url: e.target.value })}
            placeholder="example.com"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveApp} variant="contained">
            Add Site
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppGrid;