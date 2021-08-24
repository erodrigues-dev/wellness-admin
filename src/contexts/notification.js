import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import { toast } from 'react-toastify';

import { NotificationDetail } from '~/components/Notification/Detail';
import { NotificationSuspensionList } from '~/components/Notification/SuspensionList';
import service from '~/services/notification';

import useAuth from './auth';

const NotificationContext = createContext({});

const LIMIT = 20;

export const NotificationProvider = ({ children }) => {
  const { signed } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState({
    page: 1,
    total: 0,
    unreads: 0,
    rows: [],
  });
  const [detail, setDetail] = useState(null);

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
      setIsLoading(true);
      const { data } = await service.listByEmployee({
        page,
        limit: LIMIT,
      });
      setList((state) => ({
        page,
        total: data.total,
        rows: state.rows.concat(data.rows),
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
    setList((state) => ({
      ...state,
      page: state.page + 1,
    }));
  }

  useEffect(() => {
    if (signed) fetchList(list.page);
  }, [fetchList, list.page, signed]);

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
          onLoadMore={loadMore}
          onDetail={setDetail}
          onClose={onClose}
        />
      )}

      {detail && (
        <NotificationDetail item={detail} onClose={() => setDetail(null)} />
      )}
    </NotificationContext.Provider>
  );
};

export default function useNotification() {
  return useContext(NotificationContext);
}
