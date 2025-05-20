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
  colorSchemes: {
    dark: {
      palette: {
        background: {
          default: '#121212',
          paper: '#1E1E1E'
        }
      }
    },
    light: {
      palette: {
        background: {
          default: '#FFFFFF',
          paper: '#F5F5F5'
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
