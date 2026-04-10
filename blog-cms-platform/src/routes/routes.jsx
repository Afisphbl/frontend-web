import { createBrowserRouter } from "react-router-dom";
import AppLayout, { loader as appLoader } from "../Layout/AppLayout";
import Posts, { action as postsAction } from "../pages/Posts/Posts";
import ErrorPage from "../pages/Error/ErrorPage";
import PostDetails, {
  loader as postDetailsLoader,
} from "../pages/PostDetails/PostDetails";
import Category, { loader as categoryLoader } from "../pages/Category/Category";

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
      },
      {
        path: "categories/:categoryId",
        element: <Category />,
        loader: categoryLoader,
      },
      {
        path: "admin/posts/new",
        element: <h1>New Post</h1>,
      },
    ],
  },
]);
