import { RoomProvider, RoomRouter } from './components';

export const Room = () => {
  return (
    <RoomProvider>
      <RoomRouter />
    </RoomProvider>
  );
};
