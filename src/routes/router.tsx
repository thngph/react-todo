import { default as React } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../components/layout/MainLayout";

const ToDoList = React.lazy(() => import("../features/to-do-list"));

const router = createBrowserRouter([
  {
    errorElement: <div>Something went wrong</div>,
    element: <MainLayout />,
    children: [
      { path: "/", element: <ToDoList /> },
      { path: "*", element: <Navigate to={"/"} /> },
    ],
  },
]);

export default router;
