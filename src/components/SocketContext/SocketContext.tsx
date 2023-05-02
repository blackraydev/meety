import { createContext, useContext, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { DefaultProps } from '../../types';
import { API_URL } from '../../constants';

type SocketContextType = {
  socket: Socket;
};

export const SocketContext = createContext<SocketContextType>({} as SocketContextType);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: DefaultProps) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    fetch(API_URL).then(() => {
      setSocket(
        io(API_URL, {
          transports: ['websocket'],
        }),
      );
    });
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socket as Socket }}>{children}</SocketContext.Provider>
  );
};
