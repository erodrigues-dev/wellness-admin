import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { FiXCircle, FiClock } from 'react-icons/fi';

import TimePicker from '../TimePicker';
import { Container } from './styles';

const InputTimePicker = ({
  name,
  value,
  onChange,
  onBlur,
  isInvalid,
  isValid,
  feedback,
}) => {
  const [time, setTime] = useState(value);
  const [inputValue, setInputValue] = useState('');
  const [openTimePicker, setOpenTimePicker] = useState(false);

  useEffect(() => {
    setTime(value);
  }, [value]);

  useEffect(() => {
    setInputValue(time || '');
    onChange({ target: { name, value: time } });
  }, [name, onChange, time]);

  const handleToggle = () => {
    setOpenTimePicker((open) => !open);
  };

  const handleClear = () => setTime(null);

  const handleChangeTimePicker = (newTime) => {
    setTime(newTime);
  };

  return (
    <Container>
      <InputGroup>
        <FormControl
          name={name}
          onChange={() => {}}
          onClick={handleToggle}
          value={inputValue}
          onBlur={onBlur}
          isValid={isValid}
          isInvalid={isInvalid}
          placeholder="hh:mm"
          autoComplete="off"
        />
        <InputGroup.Append>
          {time && (
            <InputGroup.Text onClick={handleClear}>
              <FiXCircle />
            </InputGroup.Text>
          )}
          <InputGroup.Text onClick={handleToggle}>
            <FiClock />
          </InputGroup.Text>
        </InputGroup.Append>
        <FormControl.Feedback type="invalid">{feedback}</FormControl.Feedback>
      </InputGroup>
      {openTimePicker && (
        <TimePicker
          value={time}
          onChange={handleChangeTimePicker}
          onClose={handleToggle}
        />
      )}
    </Container>
  );
};

export default InputTimePicker;
