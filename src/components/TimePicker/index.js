import React, { useState, useEffect, useRef } from 'react';
import Fit from 'react-fit';
import TimeKeeper from 'react-timekeeper';

import { Container } from './styles';

const TimePicker = ({ value, onChange, onClose }) => {
  const [time, setTime] = useState(null);
  const componentRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!componentRef?.current?.contains(event.target)) onClose();
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  useEffect(() => {
    const date = value || new Date();

    setTime({
      hour: date.getHours(),
      minute: date.getMinutes(),
    });
  }, [value]);

  return (
    <Fit>
      <Container ref={componentRef}>
        <TimeKeeper
          switchToMinuteOnHourSelect
          closeOnMinuteSelect
          time={time}
          onChange={onChange}
          onDoneClick={onClose}
        />
      </Container>
    </Fit>
  );
};

export default TimePicker;
