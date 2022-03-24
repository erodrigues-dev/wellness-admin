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
  feedback,
  min,
  max,
}) => {
  const [dateTime, setDateTime] = useState(value);
  const [formatedValue, setFormatedValue] = useState('');
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);

  useEffect(() => setDateTime(value), [value]);

  useEffect(() => {
    setFormatedValue(formatToDateTime(dateTime) || '');
    onChange({ target: { name, value: dateTime || '' } });
  }, [dateTime, onChange, name]);

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

  const convertValueToTimeInput = (dateValue) => {
    return {
      hour: dateValue.getHours(),
      minute: dateValue.getMinutes(),
    };
  };

  return (
    <Container>
      <InputGroup>
        <FormControl
          name={name}
          onClick={handleToggle}
          value={formatedValue}
          onChange={() => {}}
          onBlur={onBlur}
          isValid={isValid}
          isInvalid={isInvalid}
          placeholder="mm/dd/yyyy hh:mm"
          autocomplete="off"
        />
        <InputGroup.Append style={{ cursor: 'pointer' }}>
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
        <FormControl.Feedback type="invalid">{feedback}</FormControl.Feedback>
      </InputGroup>
      {openDatePicker && (
        <DatePicker
          value={dateTime || new Date()}
          onChange={handleChangeDatePicker}
          onClose={handleToggleDatePicker}
          minDate={min}
          maxDate={max}
        />
      )}
      {openTimePicker && (
        <TimePicker
          value={convertValueToTimeInput(dateTime || new Date())}
          onChange={handleChangeTimePicker}
          onClose={handleToggleTimePicker}
          stepMinutes={15}
        />
      )}
    </Container>
  );
};

export default InputDateTimePicker;
