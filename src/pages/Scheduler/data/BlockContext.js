import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

import { createBlock, updateBlock } from '~/services/scheduler-blocks';

import { useSchedulerContext } from './SchedulerContext';

const initialSelectedItemState = {
  slotData: null,
  calendar: null,
  item: null,
};

const BlockContext = createContext({});

export function BlockProvider({ children }) {
  const { setModal, closeModal } = useSchedulerContext();
  const [selected, setSelected] = useState(initialSelectedItemState);

  const openNewBlock = () =>
    setModal({
      type: 'block',
      isCreate: true,
      isOpen: true,
    });

  const handleSelectedData = (data) =>
    setSelected({
      slotData: data,
      calendar: data.calendar,
      item: data.dataItem,
    });

  const openEditBlock = (data) => {
    handleSelectedData(data);
    setModal({
      selectedId: data.id,
      type: 'block',
      isEdit: true,
      isOpen: true,
    });
  };

  const submitItem = (values) =>
    values.id ? updateBlock(values) : createBlock(values);

  const onSubmit = async (formValues) => {
    try {
      const { calendar, ...values } = formValues;
      const submit = {
        calendarId: calendar?.id,
        ...values,
      };

      await submitItem(submit);

      closeModal();

      toast.success('Block saved successfully');
    } catch (error) {
      toast.error('Error on save block');
    }
  };

  return (
    <BlockContext.Provider
      value={{
        selected,
        onSubmit,
        openEditBlock,
        openNewBlock,
      }}
    >
      {children}
    </BlockContext.Provider>
  );
}

export const useBlockContext = () => useContext(BlockContext);
