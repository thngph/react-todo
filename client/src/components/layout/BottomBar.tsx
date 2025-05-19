import { Category, PlaylistAdd } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import { JSX } from 'react';
import { useLocation, useNavigate } from 'react-router';

type NavItem = {
  key: string;
  to: string;
  icon: JSX.Element;
};

const BottomBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
    </Stack>
  );
};

export default BottomBar;
