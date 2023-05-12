import { useEffect } from 'react';
import { useRoom } from '../RoomContext';
import { Video } from '../../../../components';
import { LOCAL_VIDEO } from '../../../../constants/localVideo';
import { useForceUpdate } from '../../../../hooks/useForceUpdate';
import * as UI from './RoomContent.styles';

export const RoomContent = () => {
  const {
    clients,
    provideMediaRef,
    screenShareActive,
    reloadLocalStream,
    isClientVideoEnabled,
    isClientAudioEnabled,
    senders,
  } = useRoom();

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
        return (
          <Video
            key={clientId}
            ref={(instance) => provideMediaRef(clientId, instance as HTMLVideoElement)}
            mirrored={!screenShareActive && clientId === LOCAL_VIDEO}
            videoDisabled={!isClientVideoEnabled(clientId)}
            audioDisabled={!isClientAudioEnabled(clientId)}
            muted={clientId === LOCAL_VIDEO}
            loading={false}
          />
        );
      })}
    </UI.RoomContent>
  );
};
