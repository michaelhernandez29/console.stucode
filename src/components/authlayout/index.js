import React from "react";
import PropTypes from "prop-types";
import { CssBaseline, Grid, Paper, ThemeProvider } from "@mui/material";

import theme from "./theme";
import logo from "../../assets/img/logo_background_purple.png";

const AuthLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <Paper
            elevation={0}
            sx={{ textAlign: "center", alignContent: "center" }}
          >
            <img src={logo} alt="StuCode logo" style={{ width: "70%" }} />
            {children}
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
