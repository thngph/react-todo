import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import useTheme from '../../hooks/useTheme';
import logo from '/logo.svg';

export const TopBar = () => {
  const navigate = useNavigate();
  const { icon, tooltip, toggleTheme } = useTheme();

  return (
    <Stack
      justifyContent="space-between"
      alignItems="center"
      direction="row"
      spacing={2}
      sx={{
        flexShrink: 0,
        padding: 2
      }}
    >
      {/* Logo and title */}
      <Stack direction="row" alignItems="center" spacing={2}>
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

      {/* Theme switch */}
      <Tooltip title={tooltip}>
        <IconButton onClick={toggleTheme} color="inherit">
          {icon}
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default TopBar;
