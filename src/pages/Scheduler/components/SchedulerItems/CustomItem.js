import React from 'react';

import { SchedulerItem } from '@progress/kendo-react-scheduler';

import { useAppointmentContext } from '../../data/AppointmentContext';
import { useBlockContext } from '../../data/BlockContext';
import { useClassContext } from '../../data/ClassContext';
import { Label } from './Label';

export function CustomItem(props) {
  const { openEditAppointment } = useAppointmentContext();
  const { openClassDisplay } = useClassContext();
  const { openEditBlock } = useBlockContext();

  const handleClick = () => {
    const calendar = props.group.resources[0];
    const { start, end } = props.dataItem;

    if (props.dataItem.type === 'block') {
      openEditBlock(props.dataItem);
    } else if (props.dataItem.type === 'class') {
      openClassDisplay(props.dataItem.id);
    } else {
      openEditAppointment({
        calendar,
        start,
        end,
        ...props,
      });
    }
  };

  const getBackgroundColor = () => {
    if (props.dataItem?.type === 'block') {
      return `repeating-linear-gradient(
        45deg,
        #dc3545,
        #dc3545 8px,
        #d95562 8px,
        #d95562 16px
      )`;
    }
    return props.dataItem?.color;
  };

  return (
    <SchedulerItem
      {...props}
      style={{ background: getBackgroundColor() }}
      onClick={handleClick}
      onDoubleClick={null}
      onDrag={null}
    >
      <div
        role="button"
        onKeyUp={() => {}}
        tabIndex={0}
        style={{ height: '100%' }}
      >
        {props?.dataItem?.calendarLabelId && (
          <Label calendarLabelId={props?.dataItem?.calendarLabelId} />
        )}
        {props.children}
      </div>
    </SchedulerItem>
  );
}
