import React from 'react';
import { Button } from 'react-bootstrap';

import { Window, WindowActionsBar } from '@progress/kendo-react-dialogs';

import { useClassContext } from '~/pages/Scheduler/data/ClassContext';

import { Container, DetailsInfo } from './styles';

export function ClassDetails() {
  const { openClassEdit, handleCloseModal } = useClassContext();

  return (
    <Window
      title="Class details"
      initialWidth={600}
      initialHeight={600}
      onClose={handleCloseModal}
    >
      <Container>
        <DetailsInfo>
          <span className="date">July 04</span>
          <span className="title">ADULT GROUP</span>
          <span className="slots">8 people can schedule this</span>
        </DetailsInfo>
      </Container>
      <WindowActionsBar>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => null}>
          Delete
        </Button>
        <Button onClick={openClassEdit}>Edit</Button>
      </WindowActionsBar>
    </Window>
  );
}
