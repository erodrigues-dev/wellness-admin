import React from 'react';
import Calendar from 'react-calendar';
import Fit from 'react-fit';
import OutsideClick from 'react-outside-click-handler';

import { Container } from './styles';

const DatePicker = ({
  minDate,
  maxDate,
  value,
  onChange,
  onClose,
  tileDisabled,
  onActiveStartDateChange,
}) => {
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
            tileDisabled={tileDisabled}
            onActiveStartDateChange={onActiveStartDateChange}
          />
        </OutsideClick>
      </Container>
    </Fit>
  );
};

export default DatePicker;
