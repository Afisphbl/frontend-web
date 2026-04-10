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
    ],
  },
]);
