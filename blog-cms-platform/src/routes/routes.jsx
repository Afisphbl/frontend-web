import { createBrowserRouter } from "react-router-dom";
import AppLayout, { loader as appLoader } from "../Layout/AppLayout";
import Posts, { loader as postsLoader } from "../pages/Posts/Posts";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    loader: appLoader,
    children: [
      {
        index: true,
        element: <Posts />,
        loader: postsLoader,
      },
      {
        path: "posts",
        element: <Posts />,
        loader: postsLoader,
      },
      {
        path: "admin/posts/new",
        element: <h1>New Post</h1>,
      },
    ],
  },
]);
