import React from "react";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            STUCODE
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
