import Box from '@mui/material/Box';
import { Outlet } from 'react-router';
import BottomBar from './BottomBar';
import TopBar from './TopBar';

export const MainLayout = () => {
  return (
    <Box
      id="app"
      sx={(theme) => ({
        backgroundColor: 'grey.200',
        maxWidth: theme.breakpoints.values.sm,
        minHeight: '100vh',
        mx: 'auto',
        p: 2,
        position: 'relative'
      })}
    >
      <TopBar />
      <Outlet />
      <BottomBar />
    </Box>
  );
};

export default MainLayout;
