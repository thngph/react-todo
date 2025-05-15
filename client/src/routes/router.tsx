import { default as React } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import MainLayout from '../components/layout/MainLayout';

const TodoList = React.lazy(() => import('../features/todo-list'));
const CategoryList = React.lazy(() => import('../features/category-list'));

const router = createBrowserRouter([
  {
    errorElement: <div>Something went wrong</div>,
    element: <MainLayout />,
    children: [
      {
        path: '/todo',
        element: <TodoList />
      },
      {
        path: '/category',
        element: <CategoryList />
      },
      { path: '*', element: <Navigate to={'/todo'} /> }
    ]
  }
]);

export default router;
