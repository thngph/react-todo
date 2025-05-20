import { Contrast, DarkMode, LightMode } from '@mui/icons-material';
import { useColorScheme } from '@mui/material/styles';
import { match } from 'ts-pattern';

export type ThemeMode = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const { mode, setMode } = useColorScheme();

  const icon = match(mode)
    .with('light', () => <DarkMode />)
    .with('dark', () => <Contrast />)
    .otherwise(() => <LightMode />);

  const tooltip = match(mode)
    .with('light', () => 'Switch to Dark')
    .with('dark', () => 'Switch to System')
    .otherwise(() => 'Switch to Light');

  const nextMode = match(mode)
    .with('light', () => 'dark')
    .with('dark', () => 'system')
    .otherwise(() => 'light') as ThemeMode;

  const toggleTheme = () => setMode(nextMode);

  return {
    icon,
    tooltip,
    toggleTheme
  };
};

export default useTheme;
