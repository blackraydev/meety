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
    isClientScreenShareEnabled,
    getClientName,
    cameraActive,
    micActive,
  } = useRoom();

  const { t } = useTranslation();
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    reloadLocalStream();
  }, []);

  useEffect(() => {
    forceUpdate();
  }, [clients]);

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
            muted={currentUser}
            loading={false}
            videoDisabled={currentUser ? !cameraActive : !isClientVideoEnabled(clientId)}
            audioDisabled={currentUser ? !micActive : !isClientAudioEnabled(clientId)}
            screenShareDisabled={
              currentUser ? !screenShareActive : !isClientScreenShareEnabled(clientId)
            }
          />
        );
      })}
    </UI.RoomContent>
  );
};
