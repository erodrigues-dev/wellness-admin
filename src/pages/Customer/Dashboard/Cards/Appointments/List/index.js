import React from 'react';
import { Button } from 'react-bootstrap';
import { FiXCircle } from 'react-icons/fi';

import confirmHandler from '~/components/ConfirmAlert/confirmHandler';
import { formatToDisplay, transformIn24h } from '~/helpers/date';

import { Container, DateSpan } from './styles';

const List = ({ list, handleDelete }) => {
  return (
    <Container>
      {list.map((item) => (
        <li key={item.id}>
          <div className="items">
            <div className="name">
              <span className="relationName">{item.activity.name}</span>
            </div>
            <div className="value">
              <DateSpan>{formatToDisplay(new Date(item.date))}</DateSpan>
              <span>
                | {transformIn24h(item.start)} - {transformIn24h(item.end)}
              </span>
            </div>
          </div>
          <div className="buttons">
            <Button
              variant="danger"
              onClick={() =>
                confirmHandler(
                  'Are you sure you want to cancel this appointment?',
                  () => handleDelete(item.id)
                )
              }
            >
              <FiXCircle title="Cancel Appointment" />
            </Button>
          </div>
        </li>
      ))}
    </Container>
  );
};

export default List;
