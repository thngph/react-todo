import Box from '@mui/material/Box';
import { Outlet } from 'react-router';
import Header from './Header';

export const MainLayout = () => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: 'grey.200',
        maxWidth: theme.breakpoints.values.sm,
        minHeight: '100vh',
        mx: 'auto',
        p: 2
      })}
    >
      <Header />
      <Outlet />
    </Box>
  );
};

export default MainLayout;
