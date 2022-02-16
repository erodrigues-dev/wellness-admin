import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { createItem, listActivities } from '~/services/scheduler';

import { useSchedulerContext } from './Context';

const AppointmentContext = createContext({});

export function AppointmentProvider({ children }) {
  const { saveItem } = useSchedulerContext();
  const [isOpen, setIsOpen] = useState(false);
  const [slotData, setSlotData] = useState();
  const [calendar, setCalendar] = useState(null);
  const [activities, setActivities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchActivities = useCallback(async (calendarId) => {
    try {
      const { data } = await listActivities(calendarId);

      setActivities(data);
    } catch (error) {
      toast.error('Unable to list activities of calendar');
    }
  }, []);

  const setData = useCallback((data) => {
    setSlotData(data);
    setSelectedDate(data.start);
    setCalendar(data.calendar);
    setIsOpen(true);
  }, []);

  const handleChangeDate = (value) => {
    setSelectedDate(value);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const onSubmit = async (formValues) => {
    try {
      const { activity, ...values } = formValues;
      const submit = {
        activityId: activity.id,
        ...values,
      };
      const { data } = await createItem(submit);

      saveItem(data);
      handleClose();

      toast.success('Appointment saved successfully');
    } catch (error) {
      toast.error('Error on save appointment');
    }
  };

  useEffect(() => {
    if (calendar?.id) fetchActivities(calendar?.id);
  }, [calendar, fetchActivities]);

  return (
    <AppointmentContext.Provider
      value={{
        isOpen,
        slotData,
        calendar,
        activities,
        selectedDate,
        setData,
        handleChangeDate,
        handleClose,
        onSubmit,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointmentContext() {
  return useContext(AppointmentContext);
}
