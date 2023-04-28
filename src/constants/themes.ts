import { Colors } from './colors';

export const DarkTheme = {
  colors: {
    ...Colors,
    main: 'rgb(24, 24, 32)',
    primary: 'rgb(47, 48, 56)',
    secondary: 'rgb(17, 233, 216)',
    error: 'rgb(253, 93, 92)',
    primaryHover: 'rgb(64, 64, 74)',
    secondaryHover: 'rgb(7, 223, 206)',
    errorHover: 'rgb(225, 65, 65)',
    primaryDisabled: 'rgb(30, 32, 40)',
    primaryText: 'rgb(255, 255, 255)',
    icon: 'rgb(255, 255, 255)',
    placeholderText: 'rgb(120, 120, 130)',
  },
};

export const LightTheme = {
  colors: {
    ...Colors,
    main: 'rgb(210, 210, 220)',
    primary: 'rgb(250, 250, 255)',
    secondary: 'rgb(17, 233, 216)',
    error: 'rgb(253, 93, 92)',
    primaryHover: 'rgb(230, 230, 238)',
    secondaryHover: 'rgb(7, 223, 206)',
    errorHover: 'rgb(225, 65, 65)',
    primaryDisabled: 'rgb(225, 225, 233)',
    primaryText: 'rgb(0, 0, 0)',
    icon: 'rgb(0, 0, 0)',
    placeholderText: 'rgb(180, 180, 190)',
  },
};
