import { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../../../../components';
import { SocketEventTypes } from '../../../../constants';
import { toStringDateHHMM } from '../../../../lib';
import { useRoom } from '..';
import * as UI from './RoomChat.styles';

type RoomChatProps = {
  active: boolean;
};

export const RoomChat = ({ active }: RoomChatProps) => {
  const { socket } = useSocket();
  const { id: roomId } = useParams();
  const { toggleChat, message, setMessage, clientMessages, clientName } = useRoom();

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
    return Object.keys(clientMessages).map((clientName) => {
      return clientMessages[clientName].map((message) => (
        <UI.MessageWrapper key={message.messageDate.toString()}>
          <UI.MessageHeader>
            <UI.UserName>{clientName}</UI.UserName>
            <UI.MessageTime>{toStringDateHHMM(message.messageDate)}</UI.MessageTime>
          </UI.MessageHeader>
          <UI.MessageText>{message.messageText}</UI.MessageText>
        </UI.MessageWrapper>
      ));
    });
  };

  return (
    <UI.RoomChat active={active}>
      <UI.RoomHeader>
        <UI.RoomTitle>Чат</UI.RoomTitle>
        <UI.CloseIcon onClick={toggleChat} size={32} />
      </UI.RoomHeader>
      <UI.MessageList>{renderMessages()}</UI.MessageList>
      <UI.MessageSendWrapper>
        <UI.MessageInput value={message} onChange={handleChangeMessage} placeholder="Message" />
        <UI.SendIcon onClick={handleSendMessage} disabled={!message} size={24} />
      </UI.MessageSendWrapper>
    </UI.RoomChat>
  );
};
