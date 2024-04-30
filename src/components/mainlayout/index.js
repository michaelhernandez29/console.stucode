import React, { Fragment } from "react";
import PropTypes from "prop-types";

import NavBar from "../navbar/index.js";
import { Container } from "@mui/material";

const MainLayout = ({ children }) => {
  return (
    <Fragment>
      <Container>{children}</Container>
    </Fragment>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
