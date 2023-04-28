import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      main: string;
      primary: string;
      secondary: string;
      error: string;
      primaryHover: string;
      secondaryHover: string;
      errorHover: string;
      primaryDisabled: string;
      primaryText: string;
      placeholderText: string;
      icon: string;
      white: string;
      black: string;
      gray: string;
    };
  }
}
