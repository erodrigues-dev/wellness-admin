import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { clearTime } from '~/helpers/date';
import calendarService from '~/services/calendar';
import schedulerService from '~/services/scheduler';

import { settings } from './settings';

export const initialModalState = {
  type: '',
  selectedId: '',
  isCreate: false,
  isEdit: false,
  isOpen: false,
};

export const SchedulerContext = createContext();

export function SchedulerProvider({ children }) {
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendars, setSelectedCalendars] = useState([]);
  const [selectedDate, setSelectedDate] = useState(clearTime(new Date()));
  const [entries, setEntries] = useState([]);
  const [modal, setModal] = useState(initialModalState);

  const mapToDataItem = (data) => {
    const title = `${data.customer.name} (${data.activity.name})`;
    const start = new Date(data.dateStart);
    const end = new Date(data.dateEnd);

    return {
      id: data.id,
      title,
      start,
      end,
      calendarId: data.calendar ? data.calendar.id : data.calendarId,
      activity: data.activity,
      ...data,
    };
  };

  const fetchCalendars = useCallback(async () => {
    try {
      const { data } = await calendarService.index();

      if (data.length === 0) toast.error('Not exist calendars');

      setCalendars(data);
      setSelectedCalendars(data);
    } catch (error) {
      toast.error('Unable to load calendars');
    }
  }, []);

  const fetchEntries = useCallback(async () => {
    try {
      if (selectedCalendars.length > 0 && selectedDate) {
        const { data } = await schedulerService.listItems({
          calendars: selectedCalendars.map((item) => item.id),
          date: selectedDate,
        });

        setEntries(data.map(mapToDataItem));
      }
    } catch (error) {
      toast.error('Unable to list scheduler data');
    }
  }, [selectedCalendars, selectedDate]);

  const handleSaveItemMap = useCallback((values, item) => {
    const dataItem = mapToDataItem(item);

    if (item.id) {
      return values.map((x) => (item.id === x.id ? dataItem : x));
    }

    return [...values, dataItem];
  }, []);

  const saveItem = useCallback(
    (item) => {
      setEntries((prevState) => handleSaveItemMap(prevState, item));
    },
    [handleSaveItemMap]
  );

  const closeModal = () => setModal(initialModalState);

  useEffect(() => {
    fetchCalendars();
  }, [fetchCalendars]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return (
    <SchedulerContext.Provider
      value={{
        calendars,
        selectedCalendars,
        entries,
        settings,
        setSelectedCalendars,
        setSelectedDate,
        saveItem,
        modal,
        setModal,
        closeModal,
      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
}

export function useSchedulerContext() {
  return useContext(SchedulerContext);
}
