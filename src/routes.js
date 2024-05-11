import React from "react";

import Home from "./pages/home/index.js";
import SignUp from "./pages/signup/index.js";
import SignIn from "./pages/signin/index.js";
import Users from "./pages/users/index.js";
import UserDetail from "./pages/users/userdetail/index.js";
import ArticleDetail from "./pages/home/articleDetail/index.js";

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
    element: <ArticleDetail />,
  },
  {
    path: "/user",
    element: <Users />,
  },
  {
    path: "/user/:id",
    element: <UserDetail />,
  },
];

export default routes;
