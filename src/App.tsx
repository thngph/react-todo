import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { queryClient } from './libs/query-client';
import router from './routes/router';

const theme = createTheme({
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(',')
  },
  components: {
    MuiDialog: {
      defaultProps: {
        slotProps: {
          paper: {
            sx: {
              width: 400,
              maxWidth: '100%'
            }
          }
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <ToastContainer position="top-right" />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
