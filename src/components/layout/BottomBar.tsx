import { Add, Category, PlaylistAdd } from '@mui/icons-material';
import { Box, IconButton, Stack } from '@mui/material';
import { JSX, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import NewToDoPopup from '../../features/new-todo';

type NavItem = {
  key: string;
  to: string;
  icon: JSX.Element;
};

export const BottomBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const navItems: NavItem[] = [
    { key: 'todo', to: '/todo', icon: <PlaylistAdd /> },
    { key: 'category', to: '/category', icon: <Category /> }
  ];

  const isActive = (item: NavItem) => pathname === item.to;

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: 2, flexShrink: 0 }}>
      <IconButton
        sx={{
          bgcolor: 'primary.main',
          position: 'absolute',
          left: '50%',
          padding: 2,
          transform: 'translate(-50%)'
        }}
        onClick={() => setOpen(true)}
      >
        <Add />
      </IconButton>
      {navItems.map((item) => (
        <Box
          key={item.key}
          onClick={() => navigate(item.to)}
          sx={{
            cursor: 'pointer',
            color: isActive(item) ? 'primary.main' : 'text.secondary',
            '&:hover': {
              color: 'primary.main'
            }
          }}
        >
          {item.icon}
        </Box>
      ))}

      <NewToDoPopup open={open} onClose={() => setOpen(false)} />
    </Stack>
  );
};

export default BottomBar;
