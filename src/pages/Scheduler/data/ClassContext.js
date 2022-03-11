import React, { useState, useCallback, createContext, useContext } from 'react';
import { toast } from 'react-toastify';

import { createClass, listActivities } from '~/services/scheduler';

import { useSchedulerContext } from './SchedulerContext';

const ClassContext = createContext({});

export function ClassProvider({ children }) {
  const { setModal, closeModal } = useSchedulerContext();
  const [activities, setActivities] = useState({
    list: [],
    loading: false,
  });

  const handleActivities = (state) =>
    setActivities((prevState) => ({ ...prevState, ...state }));

  const fetchActivities = useCallback(async (calendarId) => {
    try {
      handleActivities({ loading: true });
      const { data } = await listActivities(calendarId);

      handleActivities({ list: data });
    } catch (error) {
      toast.error('Unable to list activities of calendar');
    } finally {
      handleActivities({ loading: false });
    }
  }, []);

  const openNewClass = () =>
    setModal({
      type: 'class',
      isCreate: true,
      isOpen: true,
    });

  const onSubmit = async (formValues) => {
    try {
      const {
        calendar,
        activity,
        recurrenceRule,
        recurrenceExceptions,
        ...values
      } = formValues;
      const submit = {
        calendarId: calendar?.id,
        activityId: activity?.id,
        recurrenceRule: recurrenceRule || null,
        recurrenceExceptions: recurrenceExceptions || null,
        ...values,
      };
      await createClass(submit);

      closeModal();

      toast.success('Class saved successfully');
    } catch (error) {
      toast.error('Error on save appointment');
    }
  };

  return (
    <ClassContext.Provider
      value={{
        onSubmit,
        openNewClass,
        fetchActivities,
        activities,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
}

export const useClassContext = () => useContext(ClassContext);
