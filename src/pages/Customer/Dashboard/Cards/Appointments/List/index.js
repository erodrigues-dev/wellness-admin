import React from 'react';

import { formatToDisplay, transformIn24h, toDate } from '~/helpers/date';

import { Container, DateSpan, Status } from './styles';

const List = ({ list, setOpenDetails, setAppointment }) => {
  // eslint-disable-next-line no-unused-vars
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
            <span className="value">
              {transformIn24h(item.start)} - {transformIn24h(item.end)}
            </span>
            <DateSpan>{formatToDisplay(toDate(item.date))}</DateSpan>
          </div>
          <Status status={item.status}>{item.status}</Status>
        </li>
      ))}
    </Container>
  );
};

export default List;
