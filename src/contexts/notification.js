import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import { toast } from 'react-toastify';

import service from '~/services/notification';

import { NotificationSuspensionList } from '../components/Notification/SuspensionList';

const NotificationContext = createContext({});

const LIMIT = 20;

export const NotificationProvider = ({ children }) => {
  const [unreads, setUnreads] = useState({
    page: 1,
    total: 0,
    rows: [],
  });

  const [isOpen, setIsOpen] = useState(true);

  const sendNotification = (message, success = true) => {
    toast(message, {
      type: success ? toast.TYPE.SUCCESS : toast.TYPE.ERROR,
    });
  };

  const toggleNotifications = () => {
    setIsOpen((open) => !open);
  };

  const fetchUnreads = useCallback(async (page) => {
    try {
      const { headers, data } = await service.listUnreads({
        page,
        limit: LIMIT,
      });
      setUnreads({
        page,
        total: Number(headers['x-total-count']),
        rows: data,
      });
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  const onClose = () => setIsOpen(false);

  useEffect(() => {
    fetchUnreads();
  }, [fetchUnreads]);

  return (
    <NotificationContext.Provider
      value={{ sendNotification, toggleNotifications, unreads }}
    >
      {children}

      {isOpen && <NotificationSuspensionList onClose={onClose} />}
    </NotificationContext.Provider>
  );
};

export default function useNotification() {
  return useContext(NotificationContext);
}
