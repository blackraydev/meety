import { useMemo } from 'react';
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs';
import { useAppTheme } from '../AppThemeContext';
import { Button } from '../../UI';

export const AppThemeToggler = () => {
  const { theme, isDarkTheme, toggleTheme } = useAppTheme();

  const themeIconProps = useMemo(
    () => ({
      color: theme.colors.icon,
      size: 20,
    }),
    [isDarkTheme],
  );

  const renderThemeIcon = () => {
    const Icon = isDarkTheme ? BsFillSunFill : BsFillMoonStarsFill;
    return Icon({ ...themeIconProps });
  };

  return <Button content={renderThemeIcon()} onClick={toggleTheme}></Button>;
};
