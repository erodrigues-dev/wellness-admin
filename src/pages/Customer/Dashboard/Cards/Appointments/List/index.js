import React from 'react';
import { Button } from 'react-bootstrap';
import { FiEdit2, FiTrash } from 'react-icons/fi';

import confirmHandler from '~/components/ConfirmAlert/confirmHandler';

import { Container } from './styles';

const List = () => {
  return (
    <Container>
      <li>
        <div className="items">
          <div className="name">
            <span className="relationName">Activity Name</span>
          </div>
          <div className="value">
            <span>20/10/2020 08:00 AM</span>
          </div>
        </div>
        <div className="buttons">
          <Button variant="secondary" className="mr-2" onClick={() => {}}>
            <FiEdit2 color="white" />
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              confirmHandler(
                'Delete Appointment',
                'Are you sure you want to delete this appointment?',
                () => {}
              )
            }
          >
            <FiTrash />
          </Button>
        </div>
      </li>
    </Container>
  );
};

export default List;
