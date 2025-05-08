import { Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router';
import logo from '../../assets/logo.svg';
export const TopBar = () => {
  const navigate = useNavigate();

  return (
    <Stack
      justifyContent="space-between"
      direction="row"
      sx={{
        flexShrink: 0,
        p: 2
      }}
    >
      <Box component="img" src={logo} onClick={() => navigate('/')} sx={{ width: '30px', cursor: 'pointer' }} />
    </Stack>
  );
};

export default TopBar;
