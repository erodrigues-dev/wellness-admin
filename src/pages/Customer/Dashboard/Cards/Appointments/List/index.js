import React from 'react';
import { Button } from 'react-bootstrap';
import { FiXCircle } from 'react-icons/fi';

import confirmHandler from '~/components/ConfirmAlert/confirmHandler';
import { formatToDisplay, transformIn24h, toDate } from '~/helpers/date';

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
              <DateSpan>{formatToDisplay(toDate(item.date))}</DateSpan>
              <span>
                | {transformIn24h(item.start)} - {transformIn24h(item.end)}
              </span>
            </div>
            <span className="status">{item.status}</span>
          </div>
          <div className="buttons">
            {!(
              item.status === 'canceled' ||
              item.status === 'completed' ||
              toDate(item.date) < new Date()
            ) && (
              <Button
                variant="danger"
                onClick={() =>
                  confirmHandler(
                    'Are you sure you want to cancel this appointment?',
                    () => handleDelete(item.id)
                  )
                }
                disab
              >
                <FiXCircle title="Cancel Appointment" />
              </Button>
            )}
          </div>
        </li>
      ))}
    </Container>
  );
};

export default List;
