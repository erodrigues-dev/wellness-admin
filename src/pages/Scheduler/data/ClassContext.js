import React, { useState, useCallback, createContext, useContext } from 'react';
import { toast } from 'react-toastify';

import { listActivities } from '~/services/scheduler';
import { createClass, updateClass } from '~/services/scheduler-classes';

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

  const submitItem = (values) =>
    values.id ? updateClass(values) : createClass(values);

  const onSubmit = async (formValues) => {
    try {
      const { calendar, activity, recurrenceRule, notes, ...values } =
        formValues;
      const submit = {
        calendarId: calendar?.id,
        activityId: activity?.id,
        recurrenceRule: recurrenceRule || null,
        notes: notes || null,
        ...values,
      };
      const { data } = await submitItem(submit);

      saveClass(data);
      closeModal();

      toast.success('Class saved successfully');
    } catch (error) {
      toast.error('Error on save class');
    }
  };

  const openEditModal = (id) => {
    setModal({
      selectedId: id,
      type: 'class',
      isDisplay: true,
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
        openEditModal,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
}

export const useClassContext = () => useContext(ClassContext);
