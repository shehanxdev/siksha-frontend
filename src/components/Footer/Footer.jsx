import React from "react";
import { Typography, TextField, Button } from "@mui/material";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
        padding: "20px",
      }}
    >
      <Typography variant="h6" component="div" style={{ color: "white" }}>
        Subscribe to our Newsletter
      </Typography>
      <form style={{ display: "flex", alignItems: "center" }}>
        <TextField
          label="Enter your email address"
          variant="outlined"
          size="small"
          style={{ marginRight: "10px" }}
        />
        <Button
          variant="contained"
          size="medium"
          style={{ backgroundColor: "white", color: "black" }}
        >
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default Footer;
