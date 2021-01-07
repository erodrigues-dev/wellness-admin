import React from 'react';

import { Status } from '~/components/Label/styles';
import { formatToDisplay, transformIn24h, toDate } from '~/helpers/date';

import { Container } from './styles';

const List = ({ list, setOpenDetails, setAppointment }) => {
  function handleClickInfo(item) {
    setAppointment(item);
    setOpenDetails(true);
  }

  return (
    <Container>
      {list.map((item) => (
        <li key={item.id}>
          <button type="button" onClick={() => handleClickInfo(item)}>
            <div className="items">
              <h2 className="relationName">{item.activity.name}</h2>
              <div className="date">
                <span>{formatToDisplay(toDate(item.date))}</span>
                <span className="value">
                  {transformIn24h(item.start)} - {transformIn24h(item.end)}
                </span>
              </div>
            </div>
            <Status status={item.status}>{item.status}</Status>
          </button>
        </li>
      ))}
    </Container>
  );
};

export default List;
