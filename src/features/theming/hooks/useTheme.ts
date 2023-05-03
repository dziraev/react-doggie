import { useContext } from 'react';
import { ThemeContext } from '@/features';

export const useTheme = () => useContext(ThemeContext);
