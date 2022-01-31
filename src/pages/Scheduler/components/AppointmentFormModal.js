import React from 'react';

import { Window } from '@progress/kendo-react-dialogs';

import { useSchedulerContext } from '../data/Context';

export function AppointmentFormModal() {
  const { modal, setModal } = useSchedulerContext();

  if (!modal.isOpen) return null;

  return (
    <Window
      title="Add appointment"
      initialWidth={600}
      initialHeight={600}
      onClose={() => setModal({})}
    >
      <pre>{JSON.stringify(modal.data, null, 2)}</pre>
    </Window>
  );
}
