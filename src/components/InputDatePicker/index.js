import React, { useState, useEffect } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { FiCalendar, FiXCircle } from 'react-icons/fi';

import { formatToDisplay } from '~/helpers/date';

import DatePicker from '../DatePicker';
import { Container } from './styles';

function InputDatePicker({
  min,
  max,
  value,
  feedback,
  onChange,
  onBlur,
  tileDisabled,
  onActiveStartDateChange,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [formated, setFormated] = useState('');

  useEffect(() => {
    setDate(value);
  }, [value]);

  useEffect(() => {
    setFormated(date instanceof Date ? formatToDisplay(date) : '');
  }, [date]);

  function handleChangeDate(selectedDate) {
    setOpen(false);
    setDate(selectedDate);
    onChange({
      target: { name: props.name, value: selectedDate || '' },
    });
  }

  function handleClear(event) {
    event.stopPropagation();
    event.preventDefault();
    handleChangeDate(null);
  }

  return (
    <Container onClick={() => setOpen(true)}>
      <InputGroup>
        <FormControl
          {...props}
          value={formated}
          onChange={() => {}}
          onBlur={onBlur}
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
        <FormControl.Feedback type="invalid">{feedback}</FormControl.Feedback>
      </InputGroup>
      {open && (
        <DatePicker
          onChange={handleChangeDate}
          onClose={() => setOpen(false)}
          minDate={min}
          maxDate={max}
          value={date || new Date()}
          tileDisabled={tileDisabled}
          onActiveStartDateChange={onActiveStartDateChange}
        />
      )}
    </Container>
  );
}

export default InputDatePicker;
