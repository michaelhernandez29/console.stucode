import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { CssBaseline, Grid, Paper } from "@mui/material";

import logo from "../../assets/img/logo_background_purple.png";

const AuthLayout = ({ children }) => {
  return (
    <Fragment>
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
            <img src={logo} alt="StuCode logo" style={{ width: "55%" }} />
            {children}
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
