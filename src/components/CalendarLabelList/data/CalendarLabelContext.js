import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useSchedulerContext } from '~/pages/Scheduler/data/SchedulerContext';
import {
  createCalendarLabel,
  deleteCalendarLabel,
  updateCalendarLabel,
} from '~/services/calendar-labels';

const CalendarLabelContext = createContext();

export const CalendarLabelProvider = ({ value, onChange, children }) => {
  const { labels, setLabels } = useSchedulerContext();
  const [showForm, setShowForm] = useState(false);
  const [labelToEdit, setLabelToEdit] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (selectedLabel?.id !== value) {
      setSelectedLabel(labels.find((x) => x.id === value));
    }
  }, [labels, selectedLabel, value]);

  const closeList = () => {
    setShowForm(false);
    setIsOpened(false);
    setLabelToEdit(null);
  };

  const closeForm = () => {
    setShowForm(false);
    setLabelToEdit(null);
  };

  const openForm = () => setShowForm(true);

  const handleEditClick = (label) => {
    openForm();
    setLabelToEdit(label);
  };

  const handleSelectLabel = (label) => {
    const selected = selectedLabel?.id === label?.id ? null : label;

    setSelectedLabel(selected);
    onChange(selected?.id);
  };

  const submitItem = (id, values) =>
    id
      ? updateCalendarLabel(id, { id, ...values })
      : createCalendarLabel(values);

  const saveCalendarLabel = (item) => {
    setLabels((prevState) => {
      const alreadyOnList = labels.some((x) => x.id === item.id);

      if (alreadyOnList) {
        return labels.map((x) => (item.id === x.id ? item : x));
      }

      return [...prevState, item];
    });
  };

  const onSubmit = async (formValues) => {
    try {
      const { id, ...values } = formValues;
      const { data } = await submitItem(id, values);

      saveCalendarLabel(data);
      closeForm();

      toast.success('Label saved successfully');
    } catch (error) {
      toast.error('Error on save label');
    }
  };

  const deleteLabel = () => {
    if (labelToEdit?.id === selectedLabel?.id) {
      setSelectedLabel(null);
      onChange('');
    }

    setLabels((prevState) => prevState.filter((x) => x.id !== labelToEdit?.id));
  };

  const handleDeleteLabel = async () => {
    try {
      await deleteCalendarLabel(labelToEdit?.id);

      deleteLabel();
      closeForm();

      toast.success('Label deleted successfully');
    } catch (error) {
      toast.error('Error on delete label');
    }
  };

  return (
    <CalendarLabelContext.Provider
      value={{
        showForm,
        labelToEdit,
        selectedLabel,
        isOpened,
        closeList,
        closeForm,
        handleEditClick,
        handleSelectLabel,
        setIsOpened,
        openForm,
        onSubmit,
        handleDeleteLabel,
      }}
    >
      {children}
    </CalendarLabelContext.Provider>
  );
};

export const useCalendarLabel = () => useContext(CalendarLabelContext);
