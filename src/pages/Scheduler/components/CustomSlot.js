import React from 'react';

import { SchedulerSlot } from '@progress/kendo-react-scheduler';

import { useAppointmentContext } from '../data/AppointmentContext';

export function CustomSlot(props) {
  const { setData } = useAppointmentContext();

  const handleClick = () => {
    const calendar = props.group.resources[0];
    const { start, end } = props;
    setData({
      calendar,
      start,
      end,
    });
  };

  return <SchedulerSlot {...props} onClick={handleClick} />;
}
