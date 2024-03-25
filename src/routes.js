import React from "react";

import Home from "./pages/home/index.js";
import SignUp from "./pages/signup/index.js";
import SignIn from "./pages/signin/index.js";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/settings",
    element: <div>Settings</div>,
  },
  {
    path: "/article/:id",
    element: <div>Article</div>,
  },
];

export default routes;
