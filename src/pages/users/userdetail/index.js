import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ReactMarkdown from "react-markdown";

import UserService from "../../../services/userService";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(true);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [biography, setBiography] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await UserService.findById(id);
      setUser(user.data);
      setBiography(user.data.biography ?? "");
      setIsAuthenticatedUser(true);
    };
    fetchUser();
  }, [id]);

  const handleEditingMode = () => {
    setIsEditingMode(!isEditingMode);
  };

  const handleDeleteUser = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    await UserService.deleteById(id);
    navigate("/user");
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleEditingBiography = (event) => {
    setBiography(event.target.value);
  };

  const handleSaveChanges = async () => {
    await UserService.updateById(id, { biography });
    setIsEditingMode(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={4} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              src={user.logo}
              alt="Perfil"
              style={{ width: "100%", maxHeight: "80%", objectFit: "cover" }}
            />
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
            {isAuthenticatedUser ? (
              <Fragment>
                <Button
                  variant="contained"
                  color={isEditingMode ? "secondary" : "primary"}
                  style={{ marginTop: "10px" }}
                  onClick={handleEditingMode}
                >
                  {isEditingMode ? "Cancelar" : "Editar"}
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
                variant="contained"
                color="primary"
                style={{ marginTop: "10px" }}
              >
                Seguir
              </Button>
            )}
          </Paper>
        </Grid>
        <Grid item xs={8} md={8} lg={9}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {isEditingMode ? (
                  <TextField
                    multiline
                    fullWidth
                    value={biography}
                    onChange={handleEditingBiography}
                  />
                ) : (
                  <ReactMarkdown>{biography}</ReactMarkdown>
                )}

                {isEditingMode && (
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "10px" }}
                    onClick={handleSaveChanges}
                  >
                    Guardar cambios
                  </Button>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                Articulos
              </Paper>
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
    </Container>
  );
};

export default UserDetail;
