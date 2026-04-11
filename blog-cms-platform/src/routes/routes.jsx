import { BrowserRouter, createBrowserRouter, Route } from "react-router-dom";
import AppLayout, { loader as appLoader } from "../Layout/AppLayout";
import Posts, { action as postsAction } from "../pages/Posts/Posts";
import ErrorPage from "../pages/Error/ErrorPage";
import PostDetails, {
  action as postDetailsAction,
  loader as postDetailsLoader,
} from "../pages/PostDetails/PostDetails";
import Category, { loader as categoryLoader } from "../pages/Category/Category";
import AuthorPost, {
  loader as authorLoader,
} from "../pages/AuthorPost/AuthorPost";

import { Component, action as editAction } from "../pages/Admin/EditPostPage";
import {
  Component as PostFormPage,
  loader as postFormLoader,
  action as postFormAction,
} from "../pages/Admin/PostFormPage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    loader: appLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Posts />,
        action: postsAction,
      },
      {
        path: "posts",
        element: <Posts />,
        action: postsAction,
      },
      {
        path: "posts/:postId",
        element: <PostDetails />,
        loader: postDetailsLoader,
        action: postDetailsAction,
      },
      {
        path: "authors/:authorId",
        element: <AuthorPost />,
        loader: authorLoader,
      },
      {
        path: "categories/:categoryId",
        element: <Category />,
        loader: categoryLoader,
      },
      {
        path: "admin/posts/new",
        element: <PostFormPage />,
        loader: postFormLoader,
        action: postFormAction,
      },
      {
        path: "admin/posts/:postId/edit",
        element: <Component />,
        action: editAction,
      },
    ],
  },
]);
