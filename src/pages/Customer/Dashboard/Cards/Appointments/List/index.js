import React from 'react';
import { Button } from 'react-bootstrap';
import { FiInfo } from 'react-icons/fi';

import { formatToDisplay, transformIn24h, toDate } from '~/helpers/date';

import { Container, DateSpan } from './styles';

const List = ({ list, setOpenDetails, setAppointment }) => {
  function handleClickInfo(item) {
    setAppointment(item);
    setOpenDetails(true);
  }

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
            <Button
              variant="outline-primary"
              onClick={() => handleClickInfo(item)}
            >
              <FiInfo title="Appointment's Information" />
            </Button>
          </div>
        </li>
      ))}
    </Container>
  );
};

export default List;
