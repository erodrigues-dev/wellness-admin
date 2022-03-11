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
  const [items, setItems] = useState({
    appointments: [],
    classes: [],
    blocks: [],
  });
  const [modal, setModal] = useState(initialModalState);
  const [labels, setLabels] = useState([]);
  const [fetchingLabels, setFetchingLabels] = useState(true);

  useEffect(() => {
    setFetchingLabels(true);
    listCalendarLabels()
      .then((response) => setLabels(response.data))
      .catch(() => toast.error('Error on fetch calendar labels'))
      .finally(() => setFetchingLabels(false));
  }, []);

  const mapAppointmentsToDataItem = (data) => {
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
  };

  const mapClassesToDataItem = (data) => {
    const title = `${data.activity.name} - ${data.reservedSlots}/${data.slots}`;
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

  const fetchSchedulerItems = useCallback(async () => {
    try {
      if (selectedCalendars.length > 0 && selectedDate) {
        const { data } = await schedulerService.listItems({
          calendars: selectedCalendars.map((item) => item.id),
          date: selectedDate,
        });
        const appointments = data?.appointments?.map(mapAppointmentsToDataItem);
        const classes = data?.classes?.map(mapClassesToDataItem);

        setItems((prevState) => ({ ...prevState, appointments, classes }));
      }
    } catch (error) {
      toast.error('Unable to list scheduler data');
    }
  }, [selectedCalendars, selectedDate]);

  const handleSaveAppointmentMap = useCallback(
    (appointments, newAppointment) => {
      const dataItem = mapAppointmentsToDataItem(newAppointment);
      const alreadyOnList = appointments.some(
        (x) => x.id === newAppointment.id
      );

      if (alreadyOnList) {
        return appointments.map((x) =>
          newAppointment.id === x.id ? dataItem : x
        );
      }

      return [...appointments, dataItem];
    },
    []
  );

  const saveAppointment = useCallback(
    (item) => {
      setItems((prevState) => ({
        ...prevState,
        appointments: handleSaveAppointmentMap(prevState.appointments, item),
      }));
    },
    [handleSaveAppointmentMap]
  );

  const closeModal = () => setModal(initialModalState);

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
        setSelectedDate,
        saveAppointment,
        modal,
        setModal,
        closeModal,
        labels,
        setLabels,
        fetchingLabels,
      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
}

export function useSchedulerContext() {
  return useContext(SchedulerContext);
}
