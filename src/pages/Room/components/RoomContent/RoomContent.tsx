import { LOCAL_VIDEO } from '../../../../hooks/useWebRTC';
import { useRoom } from '../RoomContext';
import { Video } from './components';
import * as UI from './RoomContent.styles';

export const RoomContent = () => {
  const { clients, provideMediaRef, screenShareActive, screenShareVideoRef } = useRoom();

  return (
    <UI.RoomContent>
      {clients.map((clientId) => (
        <Video
          ref={(instance) => provideMediaRef(clientId, instance as HTMLVideoElement)}
          muted={clientId === LOCAL_VIDEO}
          loading={false}
          key={clientId}
        />
      ))}
      <UI.ScreenShareVideo
        loading={false}
        ref={screenShareVideoRef}
        screenShareActive={screenShareActive}
      />
    </UI.RoomContent>
  );
};
