import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { v4 } from 'uuid';
import { PagesRoutes } from '../../constants';
import * as UI from './Home.styles';

export const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [roomTitle, setRoomTitle] = useState('');

  const handleJoinRoom = () => {
    navigate(`${PagesRoutes.Room}/${roomTitle}`);
  };

  const handleCreateRoom = () => {
    navigate(`${PagesRoutes.Room}/${v4()}`);
  };

  return (
    <UI.Home>
      <UI.Text>{t('youCanJoin')}</UI.Text>
      <UI.JoinWrapper>
        <UI.JoinInput
          value={roomTitle}
          placeholder={t('enterRoomTitle')}
          onChange={(e) => setRoomTitle(e.target.value)}
        />
        <UI.JoinButton onClick={handleJoinRoom} disabled={!roomTitle}>
          {t('join')}
        </UI.JoinButton>
      </UI.JoinWrapper>
      <UI.Text>{t('or')}</UI.Text>
      <UI.JoinButton onClick={handleCreateRoom}>{t('createNewRoom')}</UI.JoinButton>
    </UI.Home>
  );
};
