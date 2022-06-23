import React from 'react';
import { Button } from 'react-bootstrap';

import { Window, WindowActionsBar } from '@progress/kendo-react-dialogs';

import { CalendarLabels } from '~/components/CalendarLabelList';
import { formatToFullDate, formatToTime } from '~/helpers/date';

import { useAppointmentContext } from '../../../data/AppointmentContext';
import { useSchedulerContext } from '../../../data/SchedulerContext';
import { Contact, Header } from './styles';

export function AppointmentDetails() {
  const {
    modal: { type, isOpen },
  } = useSchedulerContext();

  if (type === 'appointment-details' && isOpen) {
    return <AppointmentDetailsComponent />;
  }

  return null;
}

function AppointmentDetailsComponent() {
  const { closeModal } = useSchedulerContext();
  const { selected, openEditFromDetails, handleChangeLabel } =
    useAppointmentContext();

  const { item } = selected;

  return (
    <Window
      title="Appointment Details"
      initialWidth={600}
      initialHeight={600}
      onClose={closeModal}
    >
      <Header>
        <h2>{item.customer.name}</h2>
        <h2>{item.activity.name}</h2>
        <p>{formatToFullDate(item.dateStart)}</p>
        <p>
          {formatToTime(item.dateStart)} - {formatToTime(item.dateEnd)}
        </p>
        <p>{item.activity.duration}min</p>
      </Header>

      <CalendarLabels
        value={item.calendarLabelId}
        onChange={handleChangeLabel}
      />

      <Contact>
        <ul>
          <li>
            <span>Phone</span>
            <span>{item.customer.phone}</span>
          </li>
          <li>
            <span>Email</span>
            <span>{item.customer.email}</span>
          </li>
        </ul>
      </Contact>

      <WindowActionsBar>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button onClick={openEditFromDetails}>Edit</Button>
      </WindowActionsBar>
    </Window>
  );
}
