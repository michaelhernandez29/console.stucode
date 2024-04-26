import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Grid, Paper } from "@mui/material";

import UserService from "../../../services/userService";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const user = await UserService.findById(id);
      setUser(user.data);
    };
    fetchUser();
  }, [id]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={4} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <img
              src={user.logo}
              alt="Perfil"
              style={{ width: "100%", maxHeight: "80%", objectFit: "cover" }}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
            >
              Seguir
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={8} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
            placerat justo, sit amet ultrices nisi volutpat et. Sed quis risus
            nec turpis malesuada vehicula. Integer sodales, nisi vel convallis
            consectetur, est purus bibendum nisi, non feugiat risus sem eget
            lorem. Nulla facilisi. Sed at sagittis est. Morbi convallis tempus
            ligula, nec dapibus nunc varius a. Pellentesque in justo eu sapien
            dapibus volutpat vel et lorem. Sed elementum convallis magna nec
            tincidunt. Fusce vitae tempor urna. Sed auctor justo a eros
            suscipit, vel scelerisque justo fringilla. Vivamus consectetur urna
            ac ipsum euismod interdum. Cras efficitur, odio at venenatis
            posuere, turpis
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            Articulos
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserDetail;
