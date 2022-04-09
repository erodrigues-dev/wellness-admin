import React from 'react';

import { SchedulerEditItem } from '@progress/kendo-react-scheduler';

export function CustomEditItem(props) {
  const handleRemoveClick = (e) => {
    e.syntheticEvent.preventDefault();
    e.syntheticEvent.stopPropagation();
    console.log('>>> onRemoveItem', props.dataItem);
    // TODO abrir modal com as opções de exclusão
    // TODO excluir item
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
