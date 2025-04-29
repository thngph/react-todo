import Box from '@mui/material/Box';
import { Outlet } from 'react-router';

export const MainLayout = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'grey.200',
        maxWidth: '600px',
        mx: 'auto',
        p: 2
      }}
    >
      <Outlet />
    </Box>
  );
};

export default MainLayout;
