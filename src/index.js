import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import routes from "./routes.js";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme.js";
import { CssBaseline } from "@mui/material";
import moment from "moment";
import "moment/locale/es";
import { AuthProvider } from "./contexts/authContext.js";

moment.locale("es");

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
