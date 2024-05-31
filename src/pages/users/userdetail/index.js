import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ReactMarkdown from "react-markdown";

import ArticleService from "../../../services/articleService";
import UserService from "../../../services/userService";
import defaultImage from "../../../assets/img/no_image_available.png";
import MainLayout from "../../../components/mainlayout";
import { useAuth } from "../../../contexts/authContext";
import LikeService from "../../../services/likeService";

const UserDetail = () => {
  const { id } = useParams();
  const { isLogged, userId } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [editedUser, setEditedUser] = useState({
    logo: "",
    name: "",
    jobTitle: "",
    biography: "",
  });
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(isLogged);
  const [canEditUser, setCanEditUser] = useState(false);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [totalArticles, setTotalArticles] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalFollowers, setTotalFollowers] = useState(0);
  const [errors, setErrors] = useState({});
  const [hasFollow, setHasFollow] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await UserService.findById(id);
      setUser(user.data);
      setTotalFollowers(user.data.followers.length);
      setCanEditUser(user.data.id === userId);
      setEditedUser({
        logo: user.data.logo,
        name: user.data.name,
        jobTitle: user.data.jobTitle,
        biography: user.data.biography,
      });
      let query = `?userId=${user.data.id}`;
      const articles = await ArticleService.findAll(query);
      const likes = await LikeService.findUserLikes(`userId=${user.data.id}`);
      setTotalLikes(likes.count);
      setTotalArticles(articles.count);
      setIsAuthenticatedUser(isLogged);
      setHasFollow(user.data.followers.includes(Number.parseInt(userId, 10)));
    };
    fetchUser();
  }, [id, totalArticles, userId, isLogged, hasFollow]);

  const handleEditingMode = () => {
    setIsEditingMode(!isEditingMode);
  };

  const handleDeleteUser = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    await UserService.deleteById(id);
    navigate("/users");
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleSaveChanges = async () => {
    if (!editedUser.name) {
      setErrors({ name: "El nombre es obligatorio" });
      return;
    }

    const editedUserData = await UserService.updateById(id, editedUser);
    setUser({ ...editedUserData.data });
    setIsEditingMode(false);
    setErrors({});
  };

  const handleLikeUser = async () => {
    let followers = user.followers;
    if (hasFollow) {
      followers = followers.filter((follower) => follower !== userId);
      await UserService.updateById(id, { followers });
      setHasFollow(false);
    } else {
      followers.push(Number.parseInt(userId, 10));
      await UserService.updateById(id, { followers });
      setHasFollow(true);
    }
  };

  return (
    <MainLayout>
      <Grid container spacing={3}>
        <Grid item xs={4} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {user.logo ? (
              <img
                src={user.logo}
                alt="Perfil"
                style={{ width: "100%", maxHeight: "80%", objectFit: "cover" }}
              />
            ) : (
              <img
                src={defaultImage}
                alt="Perfil"
                style={{ width: "100%", maxHeight: "80%", objectFit: "cover" }}
              />
            )}
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", m: 1, textAlign: "center" }}
            >
              {user.name}
            </Typography>
            {user.jobTitle && (
              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  mb: 2,
                  mt: 1,
                  textAlign: "center",
                }}
              >
                {user.jobTitle}
              </Typography>
            )}
            {isAuthenticatedUser && canEditUser ? (
              <Fragment>
                <Button
                  variant="contained"
                  style={{ marginTop: "10px" }}
                  onClick={handleEditingMode}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  style={{ marginTop: "10px" }}
                  onClick={handleDeleteUser}
                >
                  Eliminar cuenta
                </Button>
              </Fragment>
            ) : (
              <Button
                variant={hasFollow ? "outlined" : "contained"}
                color="primary"
                style={{ marginTop: "10px" }}
                onClick={handleLikeUser}
              >
                {hasFollow ? "Siguiendo" : "Seguir"}
              </Button>
            )}
          </Paper>
        </Grid>
        <Grid item xs={8} md={8} lg={9}>
          <Grid container spacing={3}>
            {user.biography && (
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <ReactMarkdown>{user.biography}</ReactMarkdown>
                </Paper>
              </Grid>
            )}
            <Grid item xs={12} md={4}>
              <Link
                to={`/users/${user.id}/articles`}
                style={{
                  textDecoration: "none",
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h2" sx={{ fontWeight: "bold", mb: 1 }}>
                    {totalArticles}
                  </Typography>
                  <Typography variant="subtitle1">Artículos</Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item xs={12} md={4}>
              <Link
                to={`/users/${user.id}/favorites`}
                style={{
                  textDecoration: "none",
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h2" sx={{ fontWeight: "bold", mb: 1 }}>
                    {totalLikes}
                  </Typography>
                  <Typography variant="subtitle1">Me gusta</Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item xs={12} md={4}>
              <Link
                to={`/users/${user.id}/followers`}
                style={{
                  textDecoration: "none",
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h2" sx={{ fontWeight: "bold", mb: 1 }}>
                    {totalFollowers}
                  </Typography>
                  <Typography variant="subtitle1">Seguidores</Typography>
                </Paper>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={isDeleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>
          ¿Estás seguro de que deseas eliminar tu cuenta?
        </DialogTitle>
        <DialogContent>Esta acción es irreversible.</DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {isEditingMode && (
        <Fragment>
          <Modal
            open={isEditingMode}
            onClose={() => setIsEditingMode(false)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                postion: "absolute",
                top: "50%",
                left: "50%",
                width: "80%",
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <TextField
                label="URL de la imagen"
                fullWidth
                margin="normal"
                value={editedUser.logo}
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    logo: e.target.value,
                  })
                }
              />
              <TextField
                label="Nombre"
                fullWidth
                margin="normal"
                value={editedUser.name}
                required
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    name: e.target.value,
                  })
                }
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                label="Cargo"
                fullWidth
                margin="normal"
                value={editedUser.jobTitle}
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    jobTitle: e.target.value,
                  })
                }
              />
              <TextField
                label="Biografía"
                fullWidth
                multiline
                rows={15}
                margin="normal"
                value={editedUser.biography}
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    biography: e.target.value,
                  })
                }
              />
              <Button
                onClick={handleSaveChanges}
                variant="contained"
                color="primary"
                style={{ marginTop: "10px" }}
              >
                Guardar cambios
              </Button>
            </Box>
          </Modal>
        </Fragment>
      )}
    </MainLayout>
  );
};

export default UserDetail;
