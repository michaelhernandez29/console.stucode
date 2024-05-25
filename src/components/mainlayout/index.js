import React, { Fragment } from "react";
import PropTypes from "prop-types";
import NavBar from "../navbar/index.js";
import { Container, Box } from "@mui/material";

const MainLayout = ({ children }) => {
  return (
    <Fragment>
      <NavBar />
      <Box>
        <Container>{children}</Container>
      </Box>
    </Fragment>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
