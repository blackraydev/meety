import styled from 'styled-components';

type SwitcherStyleProps = {
  checked: boolean;
};

export const ToggleSwitch = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
`;

export const Label = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const Switcher = styled.div<SwitcherStyleProps>`
  position: relative;
  width: 50px;
  height: 25px;
  background: ${({ theme }) => theme.colors.primaryDisabled};
  border-radius: 32px;
  padding: 4px;
  transition: 0.2s ease;

  &:before {
    transition: 0.2s ease;
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    border-radius: 35px;
    top: 50%;
    left: 0px;
    background: ${({ theme, checked }) => (checked ? theme.colors.icon : theme.colors.gray)};
    transform: translate(0, -50%);
  }
`;

export const Toggler = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + ${Switcher} {
    background: ${({ theme }) => theme.colors.primaryHover};

    &:before {
      transform: translate(25px, -50%);
    }
  }
`;
