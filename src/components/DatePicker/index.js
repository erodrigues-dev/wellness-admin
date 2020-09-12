import React from 'react';
import Calendar from 'react-calendar';
import Fit from 'react-fit';
import OutsideClick from 'react-outside-click-handler';

import { Container } from './styles';

const DatePicker = ({ minDate, maxDate, value, onChange, onClose }) => {
  return (
    <Fit>
      <Container>
        <OutsideClick onOutsideClick={onClose}>
          <Calendar
            onChange={onChange}
            minDate={minDate}
            maxDate={maxDate}
            value={value}
            locale="en-US"
          />
        </OutsideClick>
      </Container>
    </Fit>
  );
};

export default DatePicker;
