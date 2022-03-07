import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { listCalendarLabels } from '~/services/calendar-labels';

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
      }}
    >
      {children}
    </CalendarLabelContext.Provider>
  );
};

export const useCalendarLabel = () => useContext(CalendarLabelContext);
