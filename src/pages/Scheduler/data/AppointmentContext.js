import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { listActivities } from '~/services/scheduler';
import {
  createAppointment,
  updateAppointment,
} from '~/services/scheduler-appointments';

import { useSchedulerContext } from './SchedulerContext';

const initialSelectedItemState = {
  slotData: null,
  calendar: null,
  item: null,
};

const AppointmentContext = createContext({});

export function AppointmentProvider({ children }) {
  const {
    modal,
    openModal,
    forceOpenModal,
    closeModal,
    setItems,
    mapAppointmentsToDataItem,
    incrementReservedSlotInClass,
  } = useSchedulerContext();
  const [activities, setActivities] = useState({
    list: [],
    loading: false,
  });
  const [selected, setSelected] = useState(initialSelectedItemState);
  const [activitiesCalendarId, setActivitiesCalendarId] = useState(null);

  const handleActivities = (state) =>
    setActivities((prevState) => ({ ...prevState, ...state }));

  const fetchActivities = useCallback(async (calendarId) => {
    try {
      handleActivities({ loading: true });
      const { data } = await listActivities(calendarId);

      handleActivities({ list: data });
      setActivitiesCalendarId(calendarId);
    } catch (error) {
      toast.error('Unable to list activities of calendar');
    } finally {
      handleActivities({ loading: false });
    }
  }, []);

  const resetSelected = () => setSelected(initialSelectedItemState);

  const openNewAppointment = (selectedClass) => {
    openModal({
      type: 'appointment',
      isCreate: true,
      isOpen: true,
      selectedClass,
    });
  };

  const addAttndeeInClass = (selectedClass) => {
    forceOpenModal({
      type: 'appointment',
      isCreate: true,
      isOpen: true,
      selectedClass,
    });
  };

  const handleSelectedData = (data) =>
    setSelected({
      slotData: data,
      calendar: data.calendar,
      item: data.dataItem,
    });

  const openFreeSlot = (data) => {
    if (modal.isOpen) return;
    handleSelectedData(data);
    openNewAppointment();
  };

  const openEditAppointment = (data) => {
    if (modal.isOpen) return;
    handleSelectedData(data);
    openModal({
      selectedId: data.id,
      type: 'appointment',
      isEdit: true,
      isOpen: true,
    });
  };

  const openEditFromDetails = () => {
    forceOpenModal({
      ...modal,
      type: 'appointment',
    });
  };

  const openDetailsAppointment = (data) => {
    if (modal.isOpen) return;
    handleSelectedData(data);
    openModal({
      selectedId: data.id,
      type: 'appointment-details',
      isOpen: true,
    });
  };

  const submitItem = (values) =>
    values.id ? updateAppointment(values) : createAppointment(values);

  const handleItemOnSave = (values, response) =>
    values.id ? { ...values, dateEnd: response.dateEnd } : response;

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
    [mapAppointmentsToDataItem]
  );

  const saveAppointment = useCallback(
    (item) => {
      setItems((prevState) => ({
        ...prevState,
        appointments: handleSaveAppointmentMap(prevState.appointments, item),
      }));
    },
    [handleSaveAppointmentMap, setItems]
  );

  const handleModalAction = () => {
    const { selectedClass } = modal;
    if (selectedClass) {
      forceOpenModal({
        selectedId: selectedClass?.id,
        type: 'class',
        isDisplay: true,
        isOpen: true,
        selectedClass,
      });
    } else {
      closeModal();
    }
  };

  const onSubmit = async (formValues) => {
    try {
      const values = formValues;
      const { activity, calendar, customer, dateEnd, ...destructuredValues } =
        formValues;
      const submit = {
        activityId: activity.id,
        calendarId: calendar.id,
        customerId: customer.id,
        ...destructuredValues,
      };

      if (!submit.calendarClassId) {
        delete submit.calendarClassId;
      }

      const { data } = await submitItem(submit);
      const items = handleItemOnSave(values, data);

      const hasCalendar = Boolean(formValues?.calendarClassId);

      if (hasCalendar) {
        incrementReservedSlotInClass(formValues?.calendarClassId);
      } else {
        saveAppointment(items);
      }

      handleModalAction();

      toast.success('Appointment saved successfully');
    } catch (error) {
      toast.error('Error on save appointment');
    }
  };

  useEffect(() => {
    const calendarId =
      modal?.selectedClass?.calendarId ?? selected?.calendar?.id;

    if (calendarId && calendarId !== activitiesCalendarId) {
      fetchActivities(calendarId);
    }
  }, [fetchActivities, selected, modal, activitiesCalendarId]);

  return (
    <AppointmentContext.Provider
      value={{
        selected,
        activities,
        onSubmit,
        openFreeSlot,
        openEditAppointment,
        openNewAppointment,
        openDetailsAppointment,
        openEditFromDetails,
        addAttndeeInClass,
        resetSelected,
        fetchActivities,
        setActivities,
        handleModalAction,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointmentContext() {
  return useContext(AppointmentContext);
}
