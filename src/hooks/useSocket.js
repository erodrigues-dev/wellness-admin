import { useEffect } from 'react';

import { io } from 'socket.io-client';

import { config } from '~/helpers/config';

let socket;

export function useSocket() {
  useEffect(() => {
    socket = io(config.socketUrl, {
      path: `/${config.socketKey}`,
    });
  }, []);

  return socket;
}
