import { default as React } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import MainLayout from '../components/layout/MainLayout';
import { Loader } from '../components/Loader';
import ServerError from '../components/ServerError';
import ToDoLoading from '../features/todo-list/ToDoLoading';

const ToDoList = React.lazy(() => import('../features/todo-list'));

const router = createBrowserRouter([
  {
    errorElement: <div>Something went wrong</div>,
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <Loader suspense={<ToDoLoading />} fallback={<ServerError />}>
            <ToDoList />
          </Loader>
        )
      },
      { path: '*', element: <Navigate to={'/'} /> }
    ]
  }
]);

export default router;
