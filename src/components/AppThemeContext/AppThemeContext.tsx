import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { DarkTheme, LightTheme } from '../../constants';
import { DefaultProps } from '../../types/common';
import { getCachedTheme, setCachedTheme } from './AppThemeContext.utils';

type AppThemeContextType = {
  theme: DefaultTheme;
  isDarkTheme: boolean;
  toggleTheme: () => void;
  setTheme: (isDarkTheme: boolean) => void;
};

export const AppThemeContext = createContext<AppThemeContextType>({} as AppThemeContextType);

export const useAppTheme = () => useContext(AppThemeContext);

export const AppThemeProvider = ({ children }: DefaultProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => getCachedTheme());

  const theme = useMemo(() => (isDarkTheme ? DarkTheme : LightTheme), [isDarkTheme]);

  useEffect(() => {
    setCachedTheme(isDarkTheme);
  }, [isDarkTheme]);

  const toggleTheme = useCallback(() => {
    setIsDarkTheme((prev) => !prev);
  }, []);

  const setTheme = useCallback((isDarkTheme: boolean) => {
    setIsDarkTheme(isDarkTheme);
  }, []);

  return (
    <AppThemeContext.Provider value={{ theme, isDarkTheme, toggleTheme, setTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppThemeContext.Provider>
  );
};
