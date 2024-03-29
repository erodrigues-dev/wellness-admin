import React, { createContext, useContext, useState, useCallback } from 'react';
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
  const { setModal, closeModal, mapBlocksToDataItem, setItems } =
    useSchedulerContext();
  const [selected, setSelected] = useState(initialSelectedItemState);

  const openNewBlock = () => {
    setSelected(initialSelectedItemState);
    setModal({
      type: 'block',
      isCreate: true,
      isOpen: true,
    });
  };

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

  const handleSaveBlockMap = useCallback(
    (blocks, newBlock) => {
      const dataItem = mapBlocksToDataItem(newBlock);
      const alreadyOnList = blocks.some(
        (currentBlock) => currentBlock.id === newBlock.id
      );

      if (alreadyOnList) {
        return blocks.map((currentBlock) =>
          newBlock.id === currentBlock.id ? dataItem : currentBlock
        );
      }

      return [...blocks, dataItem];
    },
    [mapBlocksToDataItem]
  );

  const saveBlock = useCallback(
    (item) => {
      setItems((prevState) => ({
        ...prevState,
        blocks: handleSaveBlockMap(prevState.blocks, item),
      }));
    },
    [handleSaveBlockMap, setItems]
  );

  const submitItem = (values, options) =>
    values.id ? updateBlock(values, options) : createBlock(values);

  const onSubmit = async (formValues, updateOptions) => {
    try {
      const { calendar, ...values } = formValues;
      const submit = {
        calendarId: calendar?.id,
        ...values,
      };
      const { data: response } = await submitItem(submit, updateOptions);

      const returnedBlocks = Array.isArray(response) ? response : [response];

      returnedBlocks.map((block) => saveBlock(block));
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
