import React from "react";
import PropTypes from "prop-types";
import { Grid, Paper, Typography } from "@mui/material";

const AuthLayout = ({ title, children }) => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3}>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          {children}
        </Paper>
      </Grid>
    </Grid>
  );
};

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
