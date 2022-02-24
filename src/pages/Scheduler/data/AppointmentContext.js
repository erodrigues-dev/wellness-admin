import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import {
  createAppointment,
  updateAppointment,
  listActivities,
} from '~/services/scheduler';

import { useSchedulerContext } from './SchedulerContext';

const initialSelectedItemState = {
  slotData: null,
  calendar: null,
  item: null,
};

const AppointmentContext = createContext({});

export function AppointmentProvider({ children }) {
  const { saveAppointment, setModal, closeModal } = useSchedulerContext();
  const [activities, setActivities] = useState([]);
  const [isFetchingActivites, setIsFetchingActivities] = useState(false);
  const [selected, setSelected] = useState(initialSelectedItemState);

  const fetchActivities = useCallback(async (calendarId) => {
    try {
      setIsFetchingActivities(true);
      const { data } = await listActivities(calendarId);

      setActivities(data);
    } catch (error) {
      toast.error('Unable to list activities of calendar');
    } finally {
      setIsFetchingActivities(false);
    }
  }, []);

  const resetSelected = () => setSelected(initialSelectedItemState);

  const openNewAppointment = () =>
    setModal({
      type: 'appointment',
      isCreate: true,
      isOpen: true,
    });

  const handleSelectedData = (data) =>
    setSelected({
      slotData: data,
      calendar: data.calendar,
      item: data.dataItem,
    });

  const openFreeSlot = (data) => {
    handleSelectedData(data);
    openNewAppointment();
  };

  const openEditAppointment = (data) => {
    handleSelectedData(data);
    setModal({
      selectedId: data.id,
      type: 'appointment',
      isEdit: true,
      isOpen: true,
    });
  };

  const submitItem = (id, values) =>
    id ? updateAppointment(id, { id, ...values }) : createAppointment(values);

  const handleItemOnSave = (values, response) =>
    values.id ? { ...values, dateEnd: response.dateEnd } : response;

  const onSubmit = async (formValues) => {
    try {
      const values = formValues;
      const { id, activity, calendar, customer, dateEnd, ...otherValues } =
        formValues;
      const submit = {
        activityId: activity.id,
        calendarId: calendar.id,
        customerId: customer.id,
        ...otherValues,
      };
      const { data } = await submitItem(id, submit);
      const items = handleItemOnSave(values, data);

      saveAppointment(items);
      closeModal();

      toast.success('Appointment saved successfully');
    } catch (error) {
      toast.error('Error on save appointment');
    }
  };

  useEffect(() => {
    if (selected?.calendar?.id) fetchActivities(selected?.calendar?.id);
  }, [fetchActivities, selected]);

  return (
    <AppointmentContext.Provider
      value={{
        selected,
        activities,
        onSubmit,
        openFreeSlot,
        openEditAppointment,
        openNewAppointment,
        resetSelected,
        fetchActivities,
        isFetchingActivites,
        setActivities,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointmentContext() {
  return useContext(AppointmentContext);
}
