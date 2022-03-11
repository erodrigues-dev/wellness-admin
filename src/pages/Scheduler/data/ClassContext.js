import React, { useState, useCallback, createContext, useContext } from 'react';
import { toast } from 'react-toastify';

import { createClass, listActivities } from '~/services/scheduler';

import { useSchedulerContext } from './SchedulerContext';

const ClassContext = createContext({});

export function ClassProvider({ children }) {
  const { setModal, closeModal, setItems, mapClassesToDataItem } =
    useSchedulerContext();
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

  const handleSaveClassMap = useCallback(
    (classes, newClass) => {
      const dataItem = mapClassesToDataItem(newClass);
      const alreadyOnList = classes.some((x) => x.id === newClass.id);

      if (alreadyOnList) {
        return classes.map((x) => (newClass.id === x.id ? dataItem : x));
      }

      return [...classes, dataItem];
    },
    [mapClassesToDataItem]
  );

  const saveClass = useCallback(
    (item) => {
      setItems((prevState) => ({
        ...prevState,
        classes: handleSaveClassMap(prevState.classes, item),
      }));
    },
    [handleSaveClassMap, setItems]
  );

  const onSubmit = async (formValues) => {
    try {
      const {
        calendar,
        activity,
        recurrenceRule,
        recurrenceExceptions,
        notes,
        ...values
      } = formValues;
      const submit = {
        calendarId: calendar?.id,
        activityId: activity?.id,
        recurrenceRule: recurrenceRule || null,
        recurrenceExceptions: recurrenceExceptions || null,
        notes: null,
        ...values,
      };
      const { data } = await createClass(submit);

      saveClass(data);
      closeModal();

      toast.success('Class saved successfully');
    } catch (error) {
      toast.error('Error on save appointment');
    }
  };

  const openEditClass = (id) => {
    setModal({
      selectedId: id,
      type: 'class',
      isEdit: true,
      isOpen: true,
    });
  };

  return (
    <ClassContext.Provider
      value={{
        onSubmit,
        openNewClass,
        fetchActivities,
        activities,
        openEditClass,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
}

export const useClassContext = () => useContext(ClassContext);
