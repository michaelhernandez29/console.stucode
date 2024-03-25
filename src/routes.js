import React from "react";
import SignUp from "./pages/signup/index.js";
import SignIn from "./pages/signin/index.js";

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
