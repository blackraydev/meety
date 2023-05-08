import { RoomProvider, RoomFooter, RoomContent } from './components';
import * as UI from './Room.styles';

export const Room = () => {
  return (
    <RoomProvider>
      <UI.Room>
        <RoomContent />
        <RoomFooter />
      </UI.Room>
    </RoomProvider>
  );
};
