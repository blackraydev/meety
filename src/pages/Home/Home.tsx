import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { v4 } from 'uuid';
import { checkRoomExistence } from '../../api/rooms';
import { PagesRoutes } from '../../constants';
import { useToast } from '../../UI/Toast';
import * as UI from './Home.styles';

export const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addToast } = useToast();
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

  // TODO: Implement authorization
  // const renderAuthFooter = () => {
  //   return (
  //     <UI.AuthWrapper>
  //       <UI.AuthLink to={PagesRoutes.Auth}>{t('auth')}</UI.AuthLink>
  //       {'/'}
  //       <UI.AuthLink to={PagesRoutes.Register}>{t('register')}</UI.AuthLink>
  //     </UI.AuthWrapper>
  //   );
  // };

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
