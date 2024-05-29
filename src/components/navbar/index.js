import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import RegisterIcon from "@mui/icons-material/Create";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/system";

import { useAuth } from "../../contexts/authContext.js";

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  alignItems: "center",
  padding: "10px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "5px",
  },
});

const NavBar = () => {
  const { isLogged, logout, userId } = useAuth();

  return (
    <AppBar position="static" color="primary" sx={{ marginBottom: "20px" }}>
      <Toolbar>
        <Box sx={{ mx: "auto" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <StyledLink to="/">
              <IconButton color="inherit">
                <HomeIcon />
              </IconButton>
              <Typography
                variant="button"
                sx={{ color: "white", fontSize: "16px" }}
              >
                Inicio
              </Typography>
            </StyledLink>
            <StyledLink to="/users">
              <IconButton color="inherit">
                <GroupIcon />
              </IconButton>
              <Typography
                variant="button"
                sx={{ color: "white", fontSize: "16px" }}
              >
                Red
              </Typography>
            </StyledLink>
            {isLogged && (
              <StyledLink to={`/users/${userId}/favorites`}>
                <IconButton color="inherit">
                  <FavoriteIcon />
                </IconButton>
                <Typography
                  variant="button"
                  sx={{ color: "white", fontSize: "16px" }}
                >
                  Favoritos
                </Typography>
              </StyledLink>
            )}

            {isLogged ? (
              <Fragment>
                <StyledLink to={`/users/${userId}`}>
                  <IconButton color="inherit">
                    <PersonIcon />
                  </IconButton>
                  <Typography
                    variant="button"
                    sx={{ color: "white", fontSize: "16px" }}
                  >
                    Mi Perfil
                  </Typography>
                </StyledLink>
                <StyledLink to="#" onClick={logout}>
                  <IconButton color="inherit">
                    <LogoutIcon />
                  </IconButton>
                  <Typography
                    variant="button"
                    sx={{ color: "white", fontSize: "16px" }}
                  >
                    Logout
                  </Typography>
                </StyledLink>
              </Fragment>
            ) : (
              <Fragment>
                <StyledLink to="/signin">
                  <IconButton color="inherit">
                    <LoginIcon />
                  </IconButton>
                  <Typography
                    variant="button"
                    sx={{ color: "white", fontSize: "16px" }}
                  >
                    Login
                  </Typography>
                </StyledLink>
                <StyledLink to="/signup">
                  <IconButton color="inherit">
                    <RegisterIcon />
                  </IconButton>
                  <Typography
                    variant="button"
                    sx={{ color: "white", fontSize: "16px" }}
                  >
                    Register
                  </Typography>
                </StyledLink>
              </Fragment>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
