import styled, { css } from 'styled-components';
import { IoSendSharp } from 'react-icons/io5';
import { Input } from '../../../../UI';

type SendIconStyleProps = {
  disabled: boolean;
};

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  &:not(:first-of-type) {
    margin-top: 20px;
  }
`;

export const MessageHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const UserName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primaryText};
  margin-right: 10px;
`;

export const MessageTime = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray};
  letter-spacing: 0.25px;
`;

export const MessageText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primaryText};
  margin-top: 10px;
`;

export const MessageSendWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const MessageInput = styled(Input)`
  width: 100%;
  background: ${({ theme }) => theme.colors.main};
`;

export const SendIcon = styled(IoSendSharp)<SendIconStyleProps>`
  transition: 0.3s ease;
  position: absolute;
  right: 10px;
  bottom: 12px;

  ${({ theme, disabled }) => css`
    cursor: ${disabled ? 'default' : 'pointer'};
    color: ${disabled ? theme.colors.gray : theme.colors.icon};
  `}
`;

export const NoMessagesText = styled.p`
  text-align: center;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray};
`;
