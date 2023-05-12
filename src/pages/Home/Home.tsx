import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { v4 } from 'uuid';
import { PagesRoutes, SocketEventTypes } from '../../constants';
import { useSocket } from '../../components';
import { useToast } from '../../UI/Toast';
import * as UI from './Home.styles';

export const Home = () => {
  const { addToast } = useToast();
  const { socket } = useSocket();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    if (socket) {
      socket.on(SocketEventTypes.CheckExistingRoom, handleCheckExistingRoom);

      return () => {
        socket.off(SocketEventTypes.CheckExistingRoom);
      };
    }
  }, [socket]);

  const handleCheckExistingRoom = ({ exist }: { exist: boolean }) => {
    if (!exist) {
      return addToast({
        content: t('roomNotFound'),
      });
    }

    navigate(`${PagesRoutes.Room}/${roomId}`);
  };

  const handleJoinRoomClick = () => {
    socket.emit(SocketEventTypes.CheckExistingRoom, { roomId });
  };

  const handleCreateRoomClick = () => {
    navigate(`${PagesRoutes.Room}/${v4()}`);
  };

  return (
    <UI.Home>
      <UI.Text>{t('youCanJoin')}</UI.Text>
      <UI.JoinWrapper>
        <UI.JoinInput
          value={roomId}
          placeholder={t('roomTitle')}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <UI.JoinButton onClick={handleJoinRoomClick} disabled={!roomId}>
          {t('join')}
        </UI.JoinButton>
      </UI.JoinWrapper>
      <UI.Text>{t('or')}</UI.Text>
      <UI.JoinButton onClick={handleCreateRoomClick}>{t('createNewRoom')}</UI.JoinButton>
    </UI.Home>
  );
};
