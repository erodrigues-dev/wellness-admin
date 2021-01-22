import React, { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const sendNotification = (message, success = true) => {
    toast(message, {
      type: success ? toast.TYPE.SUCCESS : toast.TYPE.ERROR,
    });
  };

  return (
    <NotificationContext.Provider value={{ sendNotification }}>
      <ToastContainer />
      {children}
    </NotificationContext.Provider>
  );
};

export default function useNotification() {
  return useContext(NotificationContext);
}
