import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import { toast } from 'react-toastify';

import { NotificationDetail } from '~/components/NavBarNotification/Detail';
import { NotificationSuspensionList } from '~/components/NavBarNotification/SuspensionList';
import service from '~/services/notification';

import { useSocket } from '../hooks/useSocket';
import useAuth from './auth';

const NavBarNotificationContext = createContext({});

const LIMIT = 20;

export const NavBarNotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const socket = useSocket();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState({
    page: 1,
    total: 0,
    unreads: 0,
    rows: [],
  });
  const [detail, setDetail] = useState(null);
  const [refreshOnOpen, setRefreshOnOpen] = useState(false);

  const sendToast = (message, success = true) => {
    toast(message, {
      type: success ? toast.TYPE.SUCCESS : toast.TYPE.ERROR,
    });
  };

  const fetchList = useCallback(async (page, append = false) => {
    try {
      setIsLoading(true);
      const { data } = await service.listByEmployee({
        page,
        limit: LIMIT,
      });
      setList((state) => ({
        page,
        total: data.total,
        rows: append ? state.rows.concat(data.rows) : data.rows,
        unreads: data.unreads,
      }));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
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
          read: hasUnreads,
        })),
        unreads: hasUnreads ? 0 : state.total,
      }));
    } catch (error) {
      toast.error(error.message);
    }
  }, [list.unreads]);

  const onClose = () => setIsOpen(false);

  function loadMore() {
    if (isLoading) return;
    fetchList(list.page + 1, true);
  }

  const toggleNotifications = () => {
    if (refreshOnOpen && !isOpen) {
      fetchList(1);
      setRefreshOnOpen(false);
    }

    setIsOpen((open) => !open);
  };

  const notificationCreatedListener = useCallback(
    ({ createdBy }) => {
      if (!user.id || user.id === createdBy) return;

      setList((state) => ({
        ...state,
        total: state.total + 1,
        unreads: state.unreads + 1,
      }));

      if (isOpen) fetchList(1);
      else setRefreshOnOpen(true);
    },
    [fetchList, isOpen, user.id]
  );

  useEffect(() => {
    fetchList(1);
  }, [fetchList]);

  useEffect(() => {
    if (!socket) return undefined;

    socket.on('notification:created', notificationCreatedListener);

    return () => {
      socket.off('notification:created');
    };
  }, [notificationCreatedListener, socket]);

  return (
    <NavBarNotificationContext.Provider
      value={{ sendToast, toggleNotifications, isLoading, list }}
    >
      {children}

      {isOpen && (
        <NotificationSuspensionList
          list={list}
          onToggleItem={toggleItem}
          onToggleAll={toggleAll}
          onLoadMore={loadMore}
          onDetail={setDetail}
          onClose={onClose}
        />
      )}

      {detail && (
        <NotificationDetail item={detail} onClose={() => setDetail(null)} />
      )}
    </NavBarNotificationContext.Provider>
  );
};

export default function useNavBarNotification() {
  return useContext(NavBarNotificationContext);
}
