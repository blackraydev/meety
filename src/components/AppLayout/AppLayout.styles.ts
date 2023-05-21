import styled, { createGlobalStyle } from 'styled-components';
import { Select } from '../../UI';

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    text-decoration: none;
    list-style: none;
    font-family: 'Rubik', sans-serif;
  }

  html {
    background: ${({ theme }) => theme.colors.main};
    overflow: hidden;
  }
`;

export const Layout = styled.div`
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.main};
`;

export const Header = styled.header`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  width: 100%;
  padding: 20px 50px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  jusfity-content: flex-end;
  align-items: center;
  gap: 25px;
`;

export const LanguageSelect = styled(Select)`
  z-index: 1;

  button,
  ul {
    word-spacing: 5px;
  }
`;
