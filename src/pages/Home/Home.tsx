import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { v4 } from 'uuid';
import { PagesRoutes } from '../../constants';
import { useToast } from '../../UI/Toast';
import { checkRoomExistence } from './Home.api';
import * as UI from './Home.styles';

export const Home = () => {
  const { addToast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');

  const handleJoinRoomClick = () => {
    checkRoomExistence(roomId)
      .then(() => {
        navigate(`${PagesRoutes.Room}/${roomId}`);
      })
      .catch(() =>
        addToast({
          content: t('roomNotFound'),
        }),
      );
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
