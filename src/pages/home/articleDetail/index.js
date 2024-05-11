import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
} from "@mui/material";
import ReactMarkdown from "react-markdown";

import ArticleService from "../../../services/articleService";
import MainLayout from "../../../components/mainlayout";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({});
  const [editedArticle, setEditedArticle] = useState({
    image: "",
    title: "",
    content: "",
  });
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(true);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      const article = await ArticleService.findById(id);
      setArticle(article.data);
      setIsAuthenticatedUser(true);
    };
    fetchArticle();
  }, [id]);

  const handleEditingMode = () => {
    setIsEditingMode(!isEditingMode);
  };

  const handleDeleteArticle = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    await ArticleService.deleteById(id);
    navigate(`/`);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleSaveChanges = async () => {
    const editedArticleData = await ArticleService.updateById(
      id,
      editedArticle,
    );
    setArticle({ ...editedArticleData.data });
    setIsEditingMode(false);
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
            <img
              src={article.image}
              alt="Perfil"
              style={{ width: "100%", maxHeight: "80%", objectFit: "cover" }}
            />
            {isAuthenticatedUser ? (
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
                  onClick={handleDeleteArticle}
                >
                  Eliminar artículo
                </Button>
              </Fragment>
            ) : (
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "10px" }}
              >
                Me gusta
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
                          value={editedArticle.image}
                          onChange={(e) =>
                            setEditedArticle({
                              ...editedArticle,
                              image: e.target.value,
                            })
                          }
                        />
                        <TextField
                          label="Título"
                          fullWidth
                          margin="normal"
                          value={editedArticle.title}
                          onChange={(e) =>
                            setEditedArticle({
                              ...editedArticle,
                              title: e.target.value,
                            })
                          }
                        />
                        <TextField
                          label="Contenido"
                          fullWidth
                          multiline
                          rows={15}
                          margin="normal"
                          value={editedArticle.content}
                          onChange={(e) =>
                            setEditedArticle({
                              ...editedArticle,
                              content: e.target.value,
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
                    <ReactMarkdown>
                      {`# ${article.title}\n\n${article.content}`}
                    </ReactMarkdown>
                  </Fragment>
                ) : (
                  <ReactMarkdown>
                    {`# ${article.title}\n\n${article.content}`}
                  </ReactMarkdown>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={isDeleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>
          ¿Estás seguro de que deseas eliminar el artículo?
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
    </MainLayout>
  );
};

export default ArticleDetail;
