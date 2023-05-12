import { RoomConfiguration, RoomContent, RoomFooter, useRoom } from '../';
import * as UI from './RoomRouter.styles';

export const RoomRouter = () => {
  const { conferenceMode } = useRoom();

  return conferenceMode ? (
    <UI.Room>
      <RoomContent />
      <RoomFooter />
    </UI.Room>
  ) : (
    <RoomConfiguration />
  );
};
