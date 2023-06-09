import { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../../../components';
import { SocketEventTypes } from '../../../../constants';
import { Drawer } from '../../../../UI';
import { useRoom } from '../';
import * as UI from './RoomChat.styles';

export const RoomChat = () => {
  const { t } = useTranslation();
  const { socket } = useSocket();
  const { id: roomId } = useParams();
  const { chatActive, toggleChat, message, setMessage, clientMessages, clientName } = useRoom();

  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message) {
      socket.emit(SocketEventTypes.SendMessage, {
        roomId,
        clientName,
        message: {
          messageText: message,
          messageDate: new Date().toString(),
        },
      });

      setMessage('');
    }
  };

  const renderMessages = () => {
    if (!clientMessages.length) {
      return <UI.NoMessagesText>{t('noMessagesYet')}</UI.NoMessagesText>;
    }

    return clientMessages.map((message, index) => {
      const currentMessageTime = message.messageDate;
      const currentMessageClientName = message.clientName;

      if (index > 0) {
        const prevMessage = clientMessages[index - 1];
        const prevMessageTime = prevMessage.messageDate;
        const prevMessageClientName = prevMessage.clientName;

        if (
          currentMessageTime === prevMessageTime &&
          currentMessageClientName === prevMessageClientName
        ) {
          return <UI.MessageText key={index}>{message.messageText}</UI.MessageText>;
        }
      }

      return (
        <UI.MessageWrapper key={index}>
          <UI.MessageHeader>
            <UI.UserName>{currentMessageClientName}</UI.UserName>
            <UI.MessageTime>{currentMessageTime}</UI.MessageTime>
          </UI.MessageHeader>
          <UI.MessageText>{message.messageText}</UI.MessageText>
        </UI.MessageWrapper>
      );
    });
  };

  return (
    <Drawer
      title={t('chat')}
      active={chatActive}
      onClose={toggleChat}
      footer={
        <UI.MessageSendWrapper>
          <UI.MessageInput
            value={message}
            onChange={handleChangeMessage}
            placeholder={t('message')}
          />
          <UI.SendIcon onClick={handleSendMessage} disabled={!message} size={24} />
        </UI.MessageSendWrapper>
      }
    >
      {renderMessages()}
    </Drawer>
  );
};
