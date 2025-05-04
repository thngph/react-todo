import Box from '@mui/material/Box';
import { Outlet } from 'react-router';
import Header from './Header';

export const MainLayout = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'grey.200',
        maxWidth: '500px',
        minHeight: '100vh',
        mx: 'auto',
        p: 2
      }}
    >
      <Header />
      <Outlet />
    </Box>
  );
};

export default MainLayout;
