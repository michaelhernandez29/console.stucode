import React from "react";

const routes = [
  {
    path: "/",
    element: <div>Home</div>,
  },
  {
    path: "/signup",
    element: <div>Sign Up</div>,
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
