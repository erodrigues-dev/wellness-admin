import React from 'react';

import { SchedulerItem } from '@progress/kendo-react-scheduler';
import styled from 'styled-components';

import { useAppointmentContext } from '../data/AppointmentContext';
import { useSchedulerContext } from '../data/SchedulerContext';

const LabelContainer = styled.div`
  margin: 12px 8px 8px 8px;
  height: 12px;
  min-width: 24px;
  max-width: 128px;
  width: 25%;
  border-radius: 25px;
  background-color: ${(props) => props.color};
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const Label = ({ calendarLabelId }) => {
  const { labels } = useSchedulerContext();
  const label = labels?.find((x) => x.id === calendarLabelId);

  return <LabelContainer title={label?.name} color={label?.color} />;
};

export function CustomItem(props) {
  const { openEditAppointment } = useAppointmentContext();

  const handleClick = () => {
    const calendar = props.group.resources[0];
    const { start, end } = props.dataItem;

    openEditAppointment({
      calendar,
      start,
      end,
      ...props,
    });
  };

  return (
    <SchedulerItem {...props} onClick={handleClick}>
      {props?.dataItem?.calendarLabelId && (
        <Label calendarLabelId={props?.dataItem?.calendarLabelId} />
      )}
      {props.children}
    </SchedulerItem>
  );
}
