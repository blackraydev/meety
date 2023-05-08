import { createContext, useContext } from 'react';
import { DefaultProps } from '../../../../types';
import { useWebRTC } from '../../../../hooks/useWebRTC';

type RoomContextType = ReturnType<typeof useWebRTC>;

export const RoomContext = createContext<RoomContextType>({} as RoomContextType);

export const useRoom = () => useContext(RoomContext);

export const RoomProvider = ({ children }: DefaultProps) => {
  const webRTCProps = useWebRTC();

  return <RoomContext.Provider value={{ ...webRTCProps }}>{children}</RoomContext.Provider>;
};
