import { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../../../components';
import { SocketEventTypes } from '../../../../constants';
import { toStringDateHHMM } from '../../../../lib';
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
    const clientNames = Object.keys(clientMessages);

    if (!clientNames.length) {
      return <UI.NoMessagesText>{t('noMessagesYet')}</UI.NoMessagesText>;
    }

    return clientNames.map((clientName) => {
      let messageFullView = true;

      return clientMessages[clientName].map((message, index) => {
        const currentMessageTime = toStringDateHHMM(message.messageDate);

        if (index > 0) {
          const prevMessage = clientMessages[clientName][index - 1];
          const prevMessageTime = toStringDateHHMM(prevMessage.messageDate);

          if (!messageFullView && currentMessageTime === prevMessageTime) {
            return (
              <UI.MessageText key={message.messageDate.toString()}>
                {message.messageText}
              </UI.MessageText>
            );
          }
        }

        messageFullView = false;

        return (
          <UI.MessageWrapper key={message.messageDate.toString()}>
            <UI.MessageHeader>
              <UI.UserName>{clientName}</UI.UserName>
              <UI.MessageTime>{currentMessageTime}</UI.MessageTime>
            </UI.MessageHeader>
            <UI.MessageText>{message.messageText}</UI.MessageText>
          </UI.MessageWrapper>
        );
      });
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
