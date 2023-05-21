import { useEffect } from 'react';
import { useRoom } from '../RoomContext';
import { Video } from '../../../../components';
import { LOCAL_VIDEO } from '../../../../constants/localVideo';
import { RoomChat, RoomParticipants } from '../';
import * as UI from './RoomContent.styles';

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
    chatActive,
    participantsActive,
    clientName,
  } = useRoom();

  useEffect(() => {
    reloadLocalStream();
  }, []);

  return (
    <UI.RoomContent panelActive={chatActive || participantsActive}>
      <UI.VideosWrapper>
        {clients.map((clientId) => {
          const currentUser = clientId === LOCAL_VIDEO;
          return (
            <Video
              key={clientId}
              ref={(instance) => provideMediaRef(clientId, instance as HTMLVideoElement)}
              mirrored={!screenShareActive && currentUser}
              name={currentUser ? clientName : getClientName(clientId)}
              muted={currentUser}
              capacity={clients.length}
              loading={false}
              videoDisabled={currentUser ? !cameraActive : !isClientVideoEnabled(clientId)}
              audioDisabled={currentUser ? !micActive : !isClientAudioEnabled(clientId)}
              screenShareDisabled={
                currentUser ? !screenShareActive : !isClientScreenShareEnabled(clientId)
              }
            />
          );
        })}
      </UI.VideosWrapper>
      <RoomChat />
      <RoomParticipants />
    </UI.RoomContent>
  );
};
