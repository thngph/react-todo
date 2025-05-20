import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router';
import BottomBar from './BottomBar';
import TopBar from './TopBar';

export const MainLayout = () => {
  return (
    <Stack height="100vh" justifyContent={'center'} alignItems="center">
      <Stack
        sx={{
          backgroundColor: 'background.default',
          maxWidth: '430px',
          borderRadius: 3,
          width: '100%',
          height: '100%',
          maxHeight: '932px',
          overflow: 'hidden'
        }}
      >
        <TopBar />
        <Box overflow="auto" mt="auto" flexGrow={1}>
          <Outlet />
        </Box>
        <BottomBar />
      </Stack>
    </Stack>
  );
};

export default MainLayout;
