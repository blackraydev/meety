import { useEffect } from 'react';
import { Video } from '../../../../components';
import { LOCAL_VIDEO } from '../../../../constants/localVideo';
import { useRoom } from '../RoomContext';
import * as UI from './RoomContent.styles';

export const RoomContent = () => {
  const {
    clients,
    provideMediaRef,
    screenShareActive,
    reloadLocalStream,
    // isClientVideoEnabled,
    // isClientAudioEnabled,
  } = useRoom();

  useEffect(() => {
    reloadLocalStream();
  }, []);

  return (
    <UI.RoomContent>
      {clients.map((clientId) => {
        return (
          <Video
            key={clientId}
            ref={(instance) => provideMediaRef(clientId, instance as HTMLVideoElement)}
            mirrored={!screenShareActive && clientId === LOCAL_VIDEO}
            // videoDisabled={!isClientVideoEnabled(clientId)}
            // audioDisabled={!isClientAudioEnabled(clientId)}
            muted={clientId === LOCAL_VIDEO}
            loading={false}
            videoDisabled={false}
            audioDisabled={false}
          />
        );
      })}
    </UI.RoomContent>
  );
};
