const IS_DARK_THEME = 'isDarkTheme';

export const setCachedTheme = (isDarkTheme: boolean) => {
  localStorage.setItem(IS_DARK_THEME, JSON.stringify(isDarkTheme));
};

export const getCachedTheme = () => {
  const isDarkThemeJSON = localStorage.getItem(IS_DARK_THEME);

  if (isDarkThemeJSON) {
    const isDarkThemeCached: boolean = JSON.parse(isDarkThemeJSON);
    return isDarkThemeCached;
  }

  return true;
};
