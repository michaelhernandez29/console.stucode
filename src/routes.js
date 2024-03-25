import React from "react";
import SignUp from "./pages/signup/index.js";

const routes = [
  {
    path: "/",
    element: <div>Home</div>,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <div>Sign In</div>,
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
