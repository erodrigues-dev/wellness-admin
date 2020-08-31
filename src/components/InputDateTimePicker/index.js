import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { FiXCircle, FiCalendar, FiClock } from 'react-icons/fi';

import { formatToDateTime } from '~/helpers/date';

import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';
import { Container } from './styles';

const InputDateTimePicker = ({
  name,
  value,
  onChange,
  onBlur,
  isInvalid,
  isValid,
}) => {
  const [dateTime, setDateTime] = useState(value);
  const [formatedValue, setFormatedValue] = useState('');
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);

  useEffect(() => setDateTime(value), [value]);

  useEffect(() => {
    setFormatedValue(formatToDateTime(dateTime) || '');
    onChange({ target: { name, value: dateTime } });
  }, [dateTime]);

  const handleToggleDatePicker = () => {
    setOpenDatePicker((open) => !open);
    setOpenTimePicker(false);
  };

  const handleToggleTimePicker = () => {
    if (!dateTime) {
      handleToggleDatePicker();
      return;
    }

    setOpenTimePicker((open) => !open);
    setOpenDatePicker(false);
  };

  const handleToggle = () => {
    if (openTimePicker) handleToggleTimePicker();
    else handleToggleDatePicker();
  };

  const handleClear = () => setDateTime(null);

  const handleChangeDatePicker = (date) => {
    setDateTime(date);
    setOpenDatePicker(false);
    setOpenTimePicker(true);
  };

  const handleChangeTimePicker = (time) => {
    const date = dateTime ? new Date(dateTime) : new Date();

    date.setHours(time.hour);
    date.setMinutes(time.minute);
    date.setSeconds(0);

    setDateTime(date);
  };

  return (
    <Container>
      <InputGroup>
        <FormControl
          name={name}
          onClick={handleToggle}
          value={formatedValue}
          onBlur={onBlur}
          isValid={isValid}
          isInvalid={isInvalid}
          placeholder="mm/dd/yyyy hh:mm"
        />
        <InputGroup.Append>
          {dateTime && (
            <InputGroup.Text onClick={handleClear}>
              <FiXCircle />
            </InputGroup.Text>
          )}
          <InputGroup.Text onClick={handleToggleDatePicker}>
            <FiCalendar />
          </InputGroup.Text>
          <InputGroup.Text onClick={handleToggleTimePicker}>
            <FiClock />
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
      {openDatePicker && (
        <DatePicker
          value={dateTime}
          onChange={handleChangeDatePicker}
          onClose={handleToggleDatePicker}
        />
      )}
      {openTimePicker && (
        <TimePicker
          value={dateTime}
          onChange={handleChangeTimePicker}
          onClose={handleToggleTimePicker}
        />
      )}
    </Container>
  );
};

export default InputDateTimePicker;
