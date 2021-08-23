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
import useAuth from './auth';

const NotificationContext = createContext({});

const LIMIT = 20;

export const NotificationProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [list, setList] = useState({
    page: 1,
    total: 0,
    unreads: 0,
    rows: [],
  });
  const { signed } = useAuth();

  const sendNotification = (message, success = true) => {
    toast(message, {
      type: success ? toast.TYPE.SUCCESS : toast.TYPE.ERROR,
    });
  };

  const toggleNotifications = () => {
    setIsOpen((open) => !open);
  };

  const fetchList = useCallback(async (page) => {
    try {
      const { data } = await service.listByEmployee({
        page,
        limit: LIMIT,
      });
      setList({
        page,
        total: data.total,
        rows: data.rows,
        unreads: data.unreads,
      });
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  const toggleItem = useCallback(async (item) => {
    try {
      if (item.read) await service.markAsUnread(item.id);
      else await service.markAsRead(item.id);

      setList((state) => ({
        ...state,
        rows: state.rows.map((row) => ({
          ...row,
          read: row.id === item.id ? !item.read : row.read,
        })),
        unreads: state.unreads + (item.read ? 1 : -1),
      }));
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  const toggleAll = useCallback(async () => {
    try {
      const hasUnreads = list.unreads > 0;

      if (hasUnreads) await service.markAllAsRead();
      else await service.markAllAsUnread();

      setList((state) => ({
        ...state,
        rows: state.rows.map((row) => ({
          ...row,
          read: !hasUnreads,
        })),
        unreads: hasUnreads ? 0 : state.total,
      }));
    } catch (error) {
      toast.error(error.message);
    }
  }, [list.unreads]);

  const onClose = () => setIsOpen(false);

  useEffect(() => {
    if (signed) fetchList();
  }, [fetchList, signed]);

  return (
    <NotificationContext.Provider
      value={{ sendNotification, toggleNotifications, list }}
    >
      {children}

      {isOpen && (
        <NotificationSuspensionList
          list={list}
          onToggleItem={toggleItem}
          onToggleAll={toggleAll}
          onClose={onClose}
        />
      )}
    </NotificationContext.Provider>
  );
};

export default function useNotification() {
  return useContext(NotificationContext);
}
