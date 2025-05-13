import { default as React } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import MainLayout from '../components/layout/MainLayout';
import { Loader } from '../components/Loader';
import ServerError from '../components/ServerError';
import CategoryList from '../features/category-list';
import ToDoLoading from '../features/todo-list/components/ToDoLoading';

const ToDoList = React.lazy(() => import('../features/todo-list'));

const router = createBrowserRouter([
  {
    errorElement: <div>Something went wrong</div>,
    element: <MainLayout />,
    children: [
      {
        path: '/todo',
        element: (
          <Loader suspense={<ToDoLoading />} fallback={<ServerError />}>
            <ToDoList />
          </Loader>
        )
      },
      {
        path: '/category',
        element: (
          <Loader suspense={<ToDoLoading />} fallback={<ServerError />}>
            <CategoryList />
          </Loader>
        )
      },
      { path: '*', element: <Navigate to={'/todo'} /> }
    ]
  }
]);

export default router;
