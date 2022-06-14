import React from 'react';
import { Button } from 'react-bootstrap';

import { Window, WindowActionsBar } from '@progress/kendo-react-dialogs';

import { useSchedulerContext } from '../../../data/SchedulerContext';

// import { CalendarLabels } from '~/components/CalendarLabelList';
// import { useAppointmentContext } from '../../../data/AppointmentContext';

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

  return (
    <Window
      title="Appointment Details"
      initialWidth={600}
      initialHeight={600}
      onClose={closeModal}
    >
      <h2>Modal de detalhe</h2>

      <WindowActionsBar>
        <Button variant="secondary" onClick={() => {}}>
          Close
        </Button>
        <Button onClick={() => {}}>Edit</Button>
      </WindowActionsBar>
    </Window>
  );
}
