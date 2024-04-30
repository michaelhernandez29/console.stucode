import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import logo from "../../assets/img/logo_navbar.png";

const pages = ["Artículos", "Red"];
const settings = ["Profile", "Account", "Logout"];

const NavBar = () => {
  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              margin: "0 auto",
            }}
          >
            <Link to="/">
              <img
                src={logo}
                alt="StuCode logo"
                style={{ width: "25%", padding: "10px" }}
              />
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              margin: "0 auto",
            }}
          >
            {pages.map((page) => (
              <Link
                key={page}
                to={"/" + page.toLowerCase()}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  margin: "0 20px",
                }}
              >
                <Typography variant="h6">{page}</Typography>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu sx={{ mt: "45px" }} id="menu-appbar">
              {settings.map((setting) => (
                <MenuItem key={setting}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
