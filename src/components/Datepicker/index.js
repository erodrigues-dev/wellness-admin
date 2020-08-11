import React, { useState, useEffect, useRef } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import Calendar from 'react-calendar';
import Fit from 'react-fit';
import { FiCalendar, FiXCircle } from 'react-icons/fi';

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
    setFormated(date instanceof Date ? formatToDisplay(date) : '');
  }, [date]);

  function handleClickOutside(event) {
    const componentIsDefined = !!componentRef;
    const componentContainsTarget = componentRef.current.contains(event.target);
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

  function handleClear(event) {
    event.stopPropagation();
    event.preventDefault();
    handleChangeDate(null);
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
          autoComplete="off"
        />
        <InputGroup.Append>
          {date && (
            <InputGroup.Text onClick={handleClear}>
              <FiXCircle />
            </InputGroup.Text>
          )}
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
