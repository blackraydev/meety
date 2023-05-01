import styled from 'styled-components';

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 20px;
`;

export const SelectButton = styled.button`
  transition: 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 16px;
  padding: 16px;
  height: 48px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const OptionsList = styled.ul`
  z-index: 1;
  text-align: center;
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 16px;
  overflow: hidden;
`;

export const OptionItem = styled.li`
  cursor: pointer;
  padding: 12px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryText};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;
