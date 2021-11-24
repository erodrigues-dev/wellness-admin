import React from 'react';

import { Day } from '@progress/kendo-date-math';
import {
  SchedulerSlot,
  SchedulerForm,
  SchedulerViewItem,
} from '@progress/kendo-react-scheduler';

import { CustomEditor } from './CustomEditor';

export function CustomSlot(props) {
  const colors = Object.freeze({
    enabled: '#fafafa',
    disabled: '#d6d6d6',
    selected: '#b0b0b0',
  });

  function getColor() {
    const day = props.start.getDay();
    const isSunday = day === Day.Sunday;
    const isSaturday = day === Day.Saturday;
    const isWorkSlot =
      props.isWorkDay && props.isWorkHour && !isSunday && !isSaturday;

    if (props.selected) return colors.selected;
    if (isWorkSlot) return colors.enabled;

    return colors.disabled;
  }

  if (props.isAllDay) return null;

  return (
    <SchedulerSlot
      {...props}
      style={{
        ...props.style,
        backgroundColor: getColor(),
      }}
    />
  );
}

export function CustomViewItem(props) {
  const { dataItem } = props;
  const { status } = dataItem;

  const colors = {
    available: '#b0d04c',
    block: '#dc3545',
  };

  return (
    <SchedulerViewItem
      {...props}
      style={{
        backgroundColor: colors[status] || colors.block,
      }}
    />
  );
}

export function CustomForm(props) {
  return <SchedulerForm {...props} editor={CustomEditor} />;
}
