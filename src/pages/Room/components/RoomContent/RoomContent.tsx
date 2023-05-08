import { useRoom } from '../RoomContext';
import { Video } from './components';
import * as UI from './RoomContent.styles';

export const RoomContent = () => {
  const { userVideoRef, peerVideoRef, screenShareVideoRef, screenShareActive, userStreamLoading } =
    useRoom();

  return (
    <UI.RoomContent>
      <Video loading={userStreamLoading} ref={userVideoRef} />
      <Video loading={false} ref={peerVideoRef} />
      <UI.ScreenShareVideo
        loading={false}
        ref={screenShareVideoRef}
        screenShareActive={screenShareActive}
      />
    </UI.RoomContent>
  );
};
