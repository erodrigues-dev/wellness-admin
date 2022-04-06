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
import { listCalendarLabels } from '~/services/calendar-labels';
import { listItems } from '~/services/scheduler';

import { settings } from './settings';

export const initialModalState = {
  type: '',
  selectedId: '',
  isCreate: false,
  isEdit: false,
  isDisplay: false,
  isOpen: false,
};

const initialItemsState = {
  appointments: [],
  classes: [],
  blocks: [],
};

export const SchedulerContext = createContext();

export function SchedulerProvider({ children }) {
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendars, setSelectedCalendars] = useState([]);
  const [selectedDate, setSelectedDate] = useState(clearTime(new Date()));
  const [items, setItems] = useState(initialItemsState);
  const [modal, setModal] = useState(initialModalState);
  const [labels, setLabels] = useState([]);
  const [fetchingLabels, setFetchingLabels] = useState(true);

  const mapAppointmentsToDataItem = useCallback((data) => {
    const title = `${data?.customer?.name} (${data.activity.name})`;
    const start = new Date(data.dateStart);
    const end = new Date(data.dateEnd);

    return {
      id: data.id,
      type: 'appointment',
      title,
      start,
      end,
      calendarId: data.calendar ? data.calendar.id : data.calendarId,
      activity: data.activity,
      ...data,
    };
  }, []);

  const mapClassesToDataItem = useCallback((data) => {
    const title = `${data.activity.name} - ${data.reservedSlots ?? 0}/${
      data.slots
    }`;
    const start = new Date(data.dateStart);
    const end = new Date(data.dateEnd);

    return {
      id: data.id,
      type: 'class',
      title,
      start,
      end,
      calendarId: data.calendar ? data.calendar.id : data.calendarId,
      activity: data.activity,
      ...data,
    };
  }, []);

  const mapBlocksToDataItem = useCallback((data) => {
    const title = `Unavailable period`;
    const start = new Date(data.dateStart);
    const end = new Date(data.dateEnd);

    return {
      ...data,
      type: 'block',
      title,
      start,
      end,
      calendarId: data.calendar ? data.calendar.id : data.calendarId,
      recurrenceExceptions: data.recurrenceExceptions.map(
        (exDate) => new Date(exDate)
      ),
    };
  }, []);

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

  const fetchSchedulerItems = useCallback(async () => {
    try {
      if (selectedCalendars.length > 0 && selectedDate) {
        setItems(initialItemsState);

        const { data } = await listItems({
          calendars: selectedCalendars.map((item) => item.id),
          date: selectedDate,
        });
        const appointments = data?.appointments?.map(mapAppointmentsToDataItem);
        const classes = data?.classes?.map(mapClassesToDataItem);
        const blocks = data?.blocks?.map(mapBlocksToDataItem);

        setItems({
          appointments,
          classes,
          blocks,
        });
      }
    } catch (error) {
      toast.error('Unable to list scheduler data');
    }
  }, [
    selectedDate,
    selectedCalendars,
    mapAppointmentsToDataItem,
    mapClassesToDataItem,
    mapBlocksToDataItem,
  ]);

  const openModal = (data) => {
    setModal((state) => (state.isOpen ? state : data));
  };

  const closeModal = () => setModal(initialModalState);

  useEffect(() => {
    setFetchingLabels(true);
    listCalendarLabels()
      .then((response) => setLabels(response.data))
      .catch(() => toast.error('Error on fetch calendar labels'))
      .finally(() => setFetchingLabels(false));
  }, []);

  useEffect(() => {
    fetchCalendars();
  }, [fetchCalendars]);

  useEffect(() => {
    fetchSchedulerItems();
  }, [fetchSchedulerItems]);

  return (
    <SchedulerContext.Provider
      value={{
        calendars,
        selectedCalendars,
        items,
        settings,
        setSelectedCalendars,
        selectedDate,
        setSelectedDate,
        modal,
        setModal: openModal,
        openModal,
        closeModal,
        labels,
        setLabels,
        fetchingLabels,
        mapAppointmentsToDataItem,
        mapClassesToDataItem,
        setItems,
        mapBlocksToDataItem,
      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
}

export function useSchedulerContext() {
  return useContext(SchedulerContext);
}
