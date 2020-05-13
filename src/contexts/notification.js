import React, { createContext, useContext, createRef } from 'react';
import ReactNotificationSystem from 'react-notification-system';

import { style } from './notification.style';

const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const ref = createRef();

  const sendNotification = (message, success = true) => {
    const notification = ref.current;
    notification.addNotification({
      message,
      level: success ? 'success' : 'error',
    });
  };

  return (
    <NotificationContext.Provider value={{ sendNotification }}>
      <ReactNotificationSystem ref={ref} style={style} />
      {children}
    </NotificationContext.Provider>
  );
};

export default function useNotification() {
  return useContext(NotificationContext);
}
