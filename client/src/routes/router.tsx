import { default as React } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import MainLayout from '../components/layout/MainLayout';
import Loader from '../components/Loader';

const TodoPage = React.lazy(() => import('../pages/TodoPage'));
const CategoryPage = React.lazy(() => import('../pages/CategoryPage'));

const router = createBrowserRouter([
  {
    errorElement: <div>Something went wrong</div>,
    element: <MainLayout />,
    children: [
      {
        path: '/todo',
        element: (
          <Loader>
            <TodoPage />
          </Loader>
        )
      },
      {
        path: '/category',
        element: (
          <Loader>
            <CategoryPage />
          </Loader>
        )
      },
      { path: '*', element: <Navigate to={'/todo'} /> }
    ]
  }
]);

export default router;
