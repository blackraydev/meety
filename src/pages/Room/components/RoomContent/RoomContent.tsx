import { useEffect } from 'react';
import { useRoom } from '../RoomContext';
import { Video } from '../../../../components';
import { LOCAL_VIDEO } from '../../../../constants/localVideo';
import { useForceUpdate } from '../../../../hooks/useForceUpdate';
import * as UI from './RoomContent.styles';
import { useTranslation } from 'react-i18next';

export const RoomContent = () => {
  const {
    clients,
    provideMediaRef,
    screenShareActive,
    reloadLocalStream,
    isClientVideoEnabled,
    isClientAudioEnabled,
    getClientName,
    senders,
  } = useRoom();

  const { t } = useTranslation();
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    reloadLocalStream();
  }, []);

  useEffect(() => {
    forceUpdate();
  }, [clients, senders]);

  return (
    <UI.RoomContent>
      {clients.map((clientId) => {
        const currentUser = clientId === LOCAL_VIDEO;
        return (
          <Video
            key={clientId}
            ref={(instance) => provideMediaRef(clientId, instance as HTMLVideoElement)}
            mirrored={!screenShareActive && currentUser}
            name={currentUser ? t('you') : getClientName(clientId)}
            videoDisabled={!isClientVideoEnabled(clientId)}
            audioDisabled={!isClientAudioEnabled(clientId)}
            muted={currentUser}
            loading={false}
          />
        );
      })}
    </UI.RoomContent>
  );
};
