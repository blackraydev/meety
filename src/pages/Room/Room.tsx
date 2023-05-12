import { RoomProvider } from './components';
import { RoomRouter } from './components/RoomRouter';

export const Room = () => {
  return (
    <RoomProvider>
      <RoomRouter />
    </RoomProvider>
  );
};
