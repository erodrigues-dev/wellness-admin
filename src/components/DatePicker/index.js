import React, { useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import Fit from 'react-fit';

import { Container } from './styles';

// TODO implement onClose

const DatePicker = ({ minDate, maxDate, value, onChange, onClose }) => {
  const componentRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      const componentIsDefined = !!componentRef;
      const componentContainsTarget = componentRef.current.contains(
        event.target
      );
      const targetIsReactCalendar =
        typeof event.target.className === 'string' &&
        event.target.className.includes('react-calendar');
      const targetIsAbbr = event.target.nodeName.toLowerCase() === 'abbr';

      if (
        componentIsDefined &&
        !componentContainsTarget &&
        !targetIsReactCalendar &&
        !targetIsAbbr
      ) {
        onClose();
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <Fit>
      <Container ref={componentRef}>
        <Calendar
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
          value={value}
          locale="en-US"
        />
      </Container>
    </Fit>
  );
};

export default DatePicker;
