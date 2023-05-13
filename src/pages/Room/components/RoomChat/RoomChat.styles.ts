import styled, { css } from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { IoSendSharp } from 'react-icons/io5';
import { Input } from '../../../../UI';

type RoomChatStyleProps = {
  active: boolean;
};

type SendIconStyleProps = {
  disabled: boolean;
};

export const RoomChat = styled.div<RoomChatStyleProps>`
  transition: 0.3s ease;
  z-index: 1000;
  position: absolute;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.primary};
  width: 400px;
  transform: ${({ active }) => `translate(${active ? 0 : 420}px)`};
  opacity: ${({ active }) => (active ? 1 : 0)};
  height: calc(100% - 40px);
  overflow: hidden;
  right: 0;
  top: 0;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
  border-radius: 20px;
`;

export const RoomHeader = styled.div`
  display: flex;
  jusfity-content: space-between;
  margin-bottom: 30px;
`;

export const RoomTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const CloseIcon = styled(IoClose)`
  transition: 0.2s ease;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 20px;
  color: ${({ theme }) => theme.colors.gray};

  &:hover {
    color: ${({ theme }) => theme.colors.icon};
  }
`;

export const MessageList = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  width: 100%;
  margin-bottom: 68px; /* MessageInput 48px + RoomChat padding 20px */
`;

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
`;

export const MessageHeader = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const UserName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primaryText};
  margin-right: 10px;
`;

export const MessageTime = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray};
  letter-spacing: 0.25px;
`;

export const MessageText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const MessageSendWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const MessageInput = styled(Input)`
  width: calc(100% - 40px);
  position: absolute;
  background: ${({ theme }) => theme.colors.main};
  bottom: 20px;
`;

export const SendIcon = styled(IoSendSharp)<SendIconStyleProps>`
  transition: 0.3s ease;
  position: absolute;
  right: 35px;
  bottom: 32px;

  ${({ theme, disabled }) => css`
    cursor: ${disabled ? 'default' : 'pointer'};
    color: ${disabled ? theme.colors.gray : theme.colors.icon};
  `}
`;
