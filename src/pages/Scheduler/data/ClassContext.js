import React, { createContext, useContext } from 'react';
import { toast } from 'react-toastify';

import { useSchedulerContext } from './SchedulerContext';

const ClassContext = createContext({});

export function ClassProvider({ children }) {
  const { setModal, closeModal } = useSchedulerContext();

  const openNewClass = () =>
    setModal({
      type: 'class',
      isCreate: true,
      isOpen: true,
    });

  const onSubmit = async () => {
    try {
      closeModal();

      toast.info('Not implemented yey');
    } catch (error) {
      toast.error('Error on save appointment');
    }
  };

  return (
    <ClassContext.Provider
      value={{
        onSubmit,
        openNewClass,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
}

export const useClassContext = () => useContext(ClassContext);
