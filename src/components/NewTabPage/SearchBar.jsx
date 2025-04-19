import { Paper, IconButton } from "@mui/material";
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
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      "_self"
    );
  };

  return (
    <SearchBarStyled onSubmit={handleSearch}>
      <form onSubmit={handleSearch} style={{ display: "flex", width: "100%" }}>
        <IconButton type="submit">
          <SearchIcon />
        </IconButton>
        <input
          name="search"
          autoComplete="off"
          autoFocus
          type="search"
          placeholder="Search Google or type a URL"
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            padding: "8px",
            fontSize: "16px",
          }}
        />
      </form>
    </SearchBarStyled>
  );
};

export default SearchBar;
