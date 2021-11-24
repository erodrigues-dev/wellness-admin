import { useEffect } from 'react';

import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
const SOCKET_KEY = process.env.REACT_APP_SOCKET_KEY;

let socket;

export function useSocket() {
  useEffect(() => {
    socket = io(SOCKET_URL, {
      path: `/${SOCKET_KEY}`,
    });
  }, []);

  return socket;
}
