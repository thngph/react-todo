import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import logo from '/logo.svg';
export const TopBar = () => {
  const navigate = useNavigate();

  return (
    <Stack
      justifyContent="flex-start"
      alignItems="center"
      direction="row"
      spacing={2}
      sx={{
        flexShrink: 0,
        padding: 2
      }}
    >
      <Box
        component="img"
        src={logo}
        onClick={() => navigate('/')}
        sx={(theme) => ({
          cursor: 'pointer',
          backgroundColor: theme.palette.primary.main,
          borderRadius: 8,
          padding: 1
        })}
      />
      <Typography variant="h4" color="primary">
        Todo
      </Typography>
    </Stack>
  );
};

export default TopBar;
