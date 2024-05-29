import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Dialog,
  TextField,
  Button,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import RegisterIcon from "@mui/icons-material/Create";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateIcon from "@mui/icons-material/Create";
import { styled } from "@mui/system";

import { useAuth } from "../../contexts/authContext.js";
import ArticleService from "../../services/articleService.js";

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
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newArticle, setNewArticle] = useState({
    image: "", // Nueva propiedad 'image'
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState({});

  const handleCreateDialogOpen = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCreateDialogClose = () => {
    setIsCreateDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle({
      ...newArticle,
      [name]: value,
    });
  };

  const handleCreateArticle = async () => {
    const newErrors = {};

    if (!newArticle.title) {
      newErrors.title = "El título es obligatorio";
    }

    if (!newArticle.content) {
      newErrors.content = "El contenido es obligatorio";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await ArticleService.create({ ...newArticle, userId });
    handleCreateDialogClose();
  };

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
                <StyledLink to="#" onClick={handleCreateDialogOpen}>
                  <IconButton color="inherit">
                    <CreateIcon />
                  </IconButton>
                  <Typography
                    variant="button"
                    sx={{ color: "white", fontSize: "16px" }}
                  >
                    Crear Artículo
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
      {/* Diálogo para crear un nuevo artículo */}
      <Dialog open={isCreateDialogOpen} onClose={handleCreateDialogClose}>
        <DialogTitle>Crear Artículo</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="image"
            name="image"
            label="Imagen URL"
            fullWidth
            value={newArticle.image}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Título"
            fullWidth
            value={newArticle.title}
            onChange={handleInputChange}
            required
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            margin="dense"
            id="content"
            name="content"
            label="Contenido"
            fullWidth
            multiline
            rows={4}
            value={newArticle.content}
            onChange={handleInputChange}
            required
            error={!!errors.content}
            helperText={errors.content}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCreateArticle} color="primary">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default NavBar;
