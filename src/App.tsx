import { CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router';
import { queryClient } from './libs/query-client';
import router from './routes/router';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ErrorBoundary fallback={<div>caught u</div>}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Fragment>
  );
}

export default App;
