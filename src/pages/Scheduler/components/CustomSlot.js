import React from 'react';

import { SchedulerSlot } from '@progress/kendo-react-scheduler';

import { useSchedulerContext } from '../data/Context';

export function CustomSlot(props) {
  const { setModal } = useSchedulerContext();

  const handleClick = () => {
    const calendar = props.group.resources[0];
    const { start, end } = props;
    setModal({
      isOpen: true,
      data: {
        calendar,
        start,
        end,
      },
    });
  };

  return <SchedulerSlot {...props} onClick={handleClick} />;
}
