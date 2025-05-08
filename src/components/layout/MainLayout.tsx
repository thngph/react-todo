import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router';
import BottomBar from './BottomBar';
import TopBar from './TopBar';

export const MainLayout = () => {
  return (
    <Stack
      sx={(theme) => ({
        backgroundColor: 'grey.200',
        maxWidth: theme.breakpoints.values.sm,
        mx: 'auto',
        position: 'relative',
        height: '100vh',
        overflow: 'hidden'
      })}
    >
      <TopBar />
      <Box overflow="auto" mt="auto" flexGrow={1}>
        <Outlet />
      </Box>
      <BottomBar />
    </Stack>
  );
};

export default MainLayout;
