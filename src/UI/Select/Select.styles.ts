import styled, { css } from 'styled-components';
import { FaChevronUp } from 'react-icons/fa';

type SelectStyleProps = {
  isOpen: boolean;
};

export const Select = styled.div<SelectStyleProps>`
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 20px;

  ${({ isOpen }) => css`
    ${OptionsList} {
      opacity: ${isOpen ? 1 : 0};
      transform: translateY(${isOpen ? 10 : 0}px);
    }
    ${ChevronIcon} {
      transform: rotate(${isOpen ? 180 : 0}deg);
    }
  `}
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
  gap: 6px;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const OptionsList = styled.ul`
  transition: 0.3s ease;
  z-index: 1;
  text-align: center;
  position: absolute;
  top: 100%;
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

export const ChevronIcon = styled(FaChevronUp)`
  transition: 0.2s ease;
`;
