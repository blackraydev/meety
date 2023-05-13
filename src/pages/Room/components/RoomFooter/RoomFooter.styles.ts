import styled, { css } from 'styled-components';
import { Button } from '../../../../UI';

type ActionButtonProps = {
  actionDisabled?: boolean;
};

export const RoomFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  min-width: 116px;
  gap: 20px;
`;

export const ActionButton = styled(Button)<ActionButtonProps>`
  width: 48px;
  height: 48px;

  ${({ theme, actionDisabled }) => css`
    color: ${actionDisabled ? theme.colors.white : theme.colors.icon};
    background: ${actionDisabled ? theme.colors.error : theme.colors.primary};

    &:hover {
      background: ${actionDisabled ? theme.colors.errorHover : theme.colors.primaryHover};
    }
  `}
`;

export const DeclineButton = styled(Button)`
  width: 60px;
  height: 60px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background: ${({ theme }) => theme.colors.errorHover};
  }
`;
