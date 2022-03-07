import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import {
  createCalendarLabel,
  listCalendarLabels,
  updateCalendarLabel,
} from '~/services/calendar-labels';

const CalendarLabelContext = createContext();

export const CalendarLabelProvider = ({ children }) => {
  const [labels, setLabels] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [labelToEdit, setLabelToEdit] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    listCalendarLabels()
      .then((response) => setLabels(response.data))
      .catch(() => toast.error('Error on fetch calendar labels'));
  }, []);

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
    setSelectedLabel(label);
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

  return (
    <CalendarLabelContext.Provider
      value={{
        labels,
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
      }}
    >
      {children}
    </CalendarLabelContext.Provider>
  );
};

export const useCalendarLabel = () => useContext(CalendarLabelContext);
