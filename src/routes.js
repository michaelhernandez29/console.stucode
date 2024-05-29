import React from "react";

import Home from "./pages/home/index.js";
import SignUp from "./pages/signup/index.js";
import SignIn from "./pages/signin/index.js";
import Users from "./pages/users/index.js";
import UserDetail from "./pages/users/userdetail/index.js";
import ArticleDetail from "./pages/home/articleDetail/index.js";
import UserArticles from "./pages/users/userarticles/index.js";
import Favorites from "./pages/favorites/index.js";

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
    path: "/articles/:id",
    element: <ArticleDetail />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/users/:id",
    element: <UserDetail />,
  },
  {
    path: "/users/:id/articles",
    element: <UserArticles />,
  },
  {
    path: "users/:id/favorites",
    element: <Favorites />,
  },
];

export default routes;
