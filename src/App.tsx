import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router';
import { queryClient } from './libs/query-client';
import router from './routes/router';

const theme = createTheme({
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(',')
  }
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </>
  );
}

export default App;
