import { useState } from 'react';
import { RoomProvider, RoomFooter, RoomContent, RoomConfiguration } from './components';
import * as UI from './Room.styles';

export const Room = () => {
  const [conferenceMode, setConferenceMode] = useState(false);

  const handleJoinRoom = () => setConferenceMode(true);

  return (
    <RoomProvider>
      {conferenceMode ? (
        <UI.Room>
          <RoomContent />
          <RoomFooter />
        </UI.Room>
      ) : (
        <RoomConfiguration onJoinRoom={handleJoinRoom} />
      )}
    </RoomProvider>
  );
};
