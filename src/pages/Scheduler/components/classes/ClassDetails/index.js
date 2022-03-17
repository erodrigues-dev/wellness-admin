import React from 'react';
import { Button } from 'react-bootstrap';

import { Window, WindowActionsBar } from '@progress/kendo-react-dialogs';

import { useClassContext } from '~/pages/Scheduler/data/ClassContext';

export function ClassDetails() {
  const { openClassEdit, handleCloseModal } = useClassContext();

  return (
    <Window
      title="Class details"
      initialWidth={600}
      initialHeight={600}
      onClose={handleCloseModal}
    >
      <div>teste</div>
      <WindowActionsBar>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button onClick={openClassEdit}>Edit</Button>
      </WindowActionsBar>
    </Window>
  );
}
