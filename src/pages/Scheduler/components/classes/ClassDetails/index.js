import React from 'react';
import { Button } from 'react-bootstrap';

import { Window, WindowActionsBar } from '@progress/kendo-react-dialogs';

import { useSchedulerContext } from '../../../data/SchedulerContext';

export function ClassDetails() {
  const {
    modal: { type, isOpen, isDisplay },
  } = useSchedulerContext();

  if (type === 'class' && isDisplay && isOpen) {
    return <ClassDetailsComponent />;
  }

  return null;
}

function ClassDetailsComponent() {
  const { closeModal } = useSchedulerContext();

  return (
    <Window
      title="Class details"
      initialWidth={600}
      initialHeight={600}
      onClose={closeModal}
    >
      <WindowActionsBar>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button>Edit</Button>
      </WindowActionsBar>
    </Window>
  );
}
