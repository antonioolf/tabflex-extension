import { TextField, Paper, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import React from "react";

const SearchBarStyled = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  width: "40%",

  // Circle
  borderRadius: "50px",
  marginBottom: theme.spacing(4),

  boxShadow: theme.shadows[3],
}));

const SearchBar = () => {
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value.trim();
    if (query) {
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        "_blank"
      );
    }
  };

  return (
    <SearchBarStyled onSubmit={handleSearch}>
      <IconButton type="submit">
        <SearchIcon />
      </IconButton>
      <input
        type="text"
        placeholder="Search Google or type a URL"
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          padding: "8px",
          fontSize: "16px",
        }}
      />
    </SearchBarStyled>
    // <Paper
    //   component="form"
    //   onSubmit={handleSearch}
    //   sx={{ mb: 4, width: "40%" }}
    // >
    //   <TextField
    //     fullWidth
    //     name="search"
    //     placeholder="Search Google or type a URL"
    //     InputProps={{
    //       startAdornment: (
    //         <InputAdornment position="start">
    //           <IconButton type="submit">
    //             <SearchIcon />
    //           </IconButton>
    //         </InputAdornment>
    //       ),
    //     }}
    //   />
    // </Paper>
  );
};

export default SearchBar;
