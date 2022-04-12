import React from 'react';

import { SchedulerEditItem } from '@progress/kendo-react-scheduler';

import { useSchedulerContext } from '../../data/SchedulerContext';

export function CustomEditItem(props) {
  const { handleRemoveItem } = useSchedulerContext();

  const handleRemoveClick = (e) => {
    e.syntheticEvent.preventDefault();
    e.syntheticEvent.stopPropagation();
    handleRemoveItem(props.dataItem);
  };

  return (
    <SchedulerEditItem
      {...props}
      onRemoveClick={handleRemoveClick}
      showOccurrenceDialog={false}
      showRemoveDialog={false}
    />
  );
}
