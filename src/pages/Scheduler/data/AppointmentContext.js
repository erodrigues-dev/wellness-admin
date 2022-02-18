import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { createItem, listActivities } from '~/services/scheduler';

import { useSchedulerContext } from './SchedulerContext';

const AppointmentContext = createContext({});

export function AppointmentProvider({ children }) {
  const { addItem, setModal, closeModal } = useSchedulerContext();
  const [slotData, setSlotData] = useState();
  const [calendar, setCalendar] = useState(null);
  const [activities, setActivities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchActivities = useCallback(async (calendarId) => {
    try {
      const { data } = await listActivities(calendarId);

      setActivities(data);
    } catch (error) {
      toast.error('Unable to list activities of calendar');
    }
  }, []);

  const openFreeSlot = (data) => {
    setSlotData(data);
    setSelectedDate(data.start);
    setCalendar(data.calendar);
    setSelectedItem(data.dataItem);
    setModal({
      type: 'appointment',
      isCreate: true,
      isOpen: true,
    });
  };

  const openAppointment = (data) => {
    setSlotData(data);
    setSelectedDate(data.start);
    setCalendar(data.calendar);
    setSelectedItem(data.dataItem);
    setModal({
      selectedId: data.id,
      type: 'appointment',
      isEdit: true,
      isOpen: true,
    });
  };

  const handleChangeDate = (value) => {
    setSelectedDate(value);
  };

  const onSubmit = async (formValues) => {
    try {
      const { activity, ...values } = formValues;
      const submit = {
        activityId: activity.id,
        ...values,
      };
      const { data } = await createItem(submit);

      addItem(data);
      closeModal();

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
        slotData,
        calendar,
        activities,
        selectedDate,
        openFreeSlot,
        handleChangeDate,
        onSubmit,
        openAppointment,
        selectedItem,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointmentContext() {
  return useContext(AppointmentContext);
}
