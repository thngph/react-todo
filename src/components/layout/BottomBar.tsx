import { Category, PlaylistAdd } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
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
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ position: 'absolute', bottom: 0, left: 0, padding: 2, width: 1 }}
      >
        {navItems.map((item) => (
          <Stack
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
          </Stack>
        ))}
        <Button variant="outlined" onClick={() => setOpen(true)}>
          create
        </Button>
        <NewToDoPopup open={open} onClose={() => setOpen(false)} />
      </Stack>
    </>
  );
};

export default BottomBar;
