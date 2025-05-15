import { Add, Category, PlaylistAdd } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import { JSX, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import TodoPopup from '../../features/new-todo';

type NavItem = {
  key: string;
  to: string;
  icon: JSX.Element;
};

const BottomBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const navItems: NavItem[] = [
    { key: 'todo', to: '/todo', icon: <PlaylistAdd /> },
    { key: 'category', to: '/category', icon: <Category /> }
  ];

  const isActive = (item: NavItem) => pathname === item.to;

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={(theme) => ({
        padding: 2,
        flexShrink: 0,
        '& svg': {
          fontSize: theme.spacing(4)
        }
      })}
    >
      {/* Floating Add Button */}
      <IconButton
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          position: 'absolute',
          left: '50%',
          padding: 2,
          transform: 'translate(-50%)',
          '&:hover': { bgcolor: 'primary.main', opacity: 0.8, transition: 'opacity .15s' }
        }}
        onClick={() => setOpen(true)}
      >
        <Add />
      </IconButton>

      {/* Navigation Buttons */}
      {navItems.map((item) => (
        <IconButton
          key={item.key}
          onClick={() => navigate(item.to)}
          sx={{
            padding: 2,
            cursor: 'pointer',
            color: isActive(item) ? 'primary.main' : 'text.secondary',
            '&:hover': {
              color: 'primary.main'
            }
          }}
        >
          {item.icon}
        </IconButton>
      ))}

      {/* New To-Do Popup */}
      <TodoPopup open={open} onClose={() => setOpen(false)} defaultValues={{ title: '' }} />
    </Stack>
  );
};

export default BottomBar;
