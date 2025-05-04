import { Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router';
import logo from '../../assets/logo.svg';
export const Header = () => {
  const navigate = useNavigate();

  return (
    <Stack justifyContent="space-between" direction="row" sx={{ p: 2 }}>
      <Box component="img" src={logo} onClick={() => navigate('/')} sx={{ width: '40px', cursor: 'pointer' }} />
    </Stack>
  );
};

export default Header;
