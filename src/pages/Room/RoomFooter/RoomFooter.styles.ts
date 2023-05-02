import styled from 'styled-components';
import { Button } from '../../../UI';

type ActionButtonProps = {
  actionDisabled?: boolean;
};

export const RoomFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 24px 0;
`;

export const ActionButton = styled(Button)<ActionButtonProps>`
  width: 48px;
  height: 48px;
  background: ${({ theme, actionDisabled = false }) =>
    actionDisabled ? theme.colors.error : theme.colors.primary};

  &:hover {
    background: ${({ theme, actionDisabled = false }) =>
      actionDisabled ? theme.colors.errorHover : theme.colors.primaryHover};
  }
`;

export const DeclineButton = styled(Button)`
  width: 60px;
  height: 60px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.error};

  &:hover {
    background: ${({ theme }) => theme.colors.errorHover};
  }
`;
