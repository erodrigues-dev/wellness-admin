import React, { useState, useEffect, useRef } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import Calendar from 'react-calendar';
import Fit from 'react-fit';
import { FiCalendar } from 'react-icons/fi';

import { formatToDisplay } from '~/helpers/date';

import { Container, Popover } from './styles';

function Datepicker({ min, max, value, onChange, ...props }) {
  const componentRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(value);
  const [formated, setFormated] = useState('');

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (date instanceof Date) {
      const f = formatToDisplay(date);

      setFormated(f);
    }
  }, [date]);

  function handleClickOutside(event) {
    if (
      componentRef &&
      !componentRef.current.contains(event.target) &&
      !event.target.className.includes('react-calendar') &&
      event.target.nodeName.toLowerCase() !== 'abbr'
    ) {
      setOpen(false);
    }
  }

  function handleChangeDate(selectedDate) {
    setOpen(false);
    setDate(selectedDate);
    onChange({
      target: { name: props.name, value: selectedDate },
    });
  }

  return (
    <Container ref={componentRef} onClick={() => setOpen(true)}>
      <InputGroup>
        <FormControl
          {...props}
          value={formated}
          onChange={() => {}}
          onFocus={() => setOpen(true)}
          placeholder="mm/dd/yyyy"
        />
        <InputGroup.Append>
          <InputGroup.Text>
            <FiCalendar />
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
      {open && (
        <Fit>
          <Popover>
            <Calendar
              onChange={handleChangeDate}
              minDate={min}
              maxDate={max}
              value={date}
              locale="en-US"
            />
          </Popover>
        </Fit>
      )}
    </Container>
  );
}

export default Datepicker;
