import React from "react";
import { Typography } from "@mui/material";

const NewTabPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h2" color="primary">
        Welcome to TabFlex
      </Typography>
    </div>
  );
};

export default NewTabPage;
