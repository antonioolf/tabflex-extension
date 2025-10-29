// src/components/SearchBar.jsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  Paper,
} from '@mui/material';
import {
  Search,
} from '@mui/icons-material';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Se parece com uma URL, navegar diretamente
      if (searchQuery.includes('.') && !searchQuery.includes(' ')) {
        const url = searchQuery.startsWith('http') ? searchQuery : `https://${searchQuery}`;
        window.location.href = url;
      } else {
        // Caso contrário, pesquisar no Google
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
        window.location.href = searchUrl;
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 500,
        mx: 'auto',
        mt: 4,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 6,
          overflow: 'hidden',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          },
          '&:focus-within': {
            borderColor: 'primary.main',
            boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
          },
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            sx: {
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              height: 48,
              fontSize: '1rem',
            },
          }}
          sx={{
            '& .MuiInputBase-input': {
              pl: 1,
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            minWidth: 80,
            height: 48,
            borderRadius: 0,
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
            textTransform: 'none',
            fontSize: '0.9rem',
            fontWeight: 500,
          }}
        >
          Search
        </Button>
      </Paper>
    </Box>
  );
};

export default SearchBar;