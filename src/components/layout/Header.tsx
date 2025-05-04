import { Box, Stack } from '@mui/material';
import logo from '../../assets/logo.svg';
export const Header = () => {
  return (
    <Stack justifyContent="space-between" direction="row" sx={{ p: 2 }}>
      <Box
        component="img"
        src={logo}
        sx={{
          width: '40px'
        }}
      />
    </Stack>
  );
};

export default Header;
