import React from 'react';

import { SchedulerItem } from '@progress/kendo-react-scheduler';

import { useAppointmentContext } from '../data/AppointmentContext';

export function CustomItem(props) {
  const { openAppointment } = useAppointmentContext();

  const handleClick = () => {
    const calendar = props.group.resources[0];
    const { start, end } = props.dataItem;

    openAppointment({
      calendar,
      start,
      end,
      ...props,
    });
  };

  return <SchedulerItem {...props} onClick={handleClick} />;
}
