import { createBrowserRouter } from "react-router-dom";
import AppLayout, { loader as appLoader } from "../Layout/AppLayout";
import Posts, { action as postsAction } from "../pages/Posts/Posts";
import ErrorPage from "../pages/Error/ErrorPage";
import PostDetails, {
  loader as postDetailsLoader,
} from "../pages/PostDetails/PostDetails";

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
        path: "admin/posts/new",
        element: <h1>New Post</h1>,
      },
    ],
  },
]);
