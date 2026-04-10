import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../Layout/AppLayout";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <h1>Hello</h1>,
      },
      {
        path: "posts",
        element: <h1>Explore</h1>,
      },
      {
        path: "admin/posts/new",
        element: <h1>New Post</h1>,
      },
    ],
  },
]);
