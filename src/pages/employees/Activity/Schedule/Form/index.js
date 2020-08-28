import React, { useState } from 'react';
import { Modal, Form, Col } from 'react-bootstrap';

import InputDateTimePicker from '~/components/InputDateTimePicker';

// import { Container } from './styles';

const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const endsInOptions = ['Never', 'In', 'After'];

function ScheduleForm({ show, onClose }) {
  const [recurrence, setRecurrence] = useState('diary');
  const [endsIn, setEndsIn] = useState(endsInOptions[0]);

  function handleChangeRecurrence({ target }) {
    setRecurrence(target.value);
  }

  function handleChangeEndsIn({ target }) {
    setEndsIn(target.value);
  }

  function handleChangeStart(date) {
    console.log('change date ->', date);
  }

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Title</Form.Label>
              <Form.Control placeholder="title" name="title" />
            </Form.Group>
            <Form.Group as={Col} sm={2}>
              <Form.Label>Color</Form.Label>
              <Form.Control
                name="color"
                type="color"
                defaultValue="#b0d04c"
                style={{ padding: 0 }}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} lg="6">
              <Form.Label>Start</Form.Label>
              <InputDateTimePicker name="start" onChange={handleChangeStart} />
            </Form.Group>
            <Form.Group as={Col} lg="6">
              <Form.Label>End</Form.Label>
              <InputDateTimePicker name="end" onChange={() => {}} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm={3} md={6}>
              <Form.Label>Repeat every</Form.Label>
              <Form.Control
                placeholder="Repeat times"
                name="repeat"
                defaultValue={1}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Recurrence</Form.Label>
              <Form.Control
                value={recurrence}
                as="select"
                name="recurrence"
                onChange={handleChangeRecurrence}
                custom
              >
                <option value="diary" selected>
                  Day(s)
                </option>
                <option value="weekly">Week(s)</option>
                <option value="monthly">Month(s)</option>
              </Form.Control>
            </Form.Group>
            {recurrence === 'weekly' && (
              <Form.Group as={Col} md={12}>
                <Form.Label>Week Days</Form.Label>
                <Form.Group id="weekday">
                  {weekDays.map((day) => (
                    <Form.Check
                      key={day}
                      type="checkbox"
                      label={day}
                      id={day}
                      custom
                      inline
                    />
                  ))}
                </Form.Group>
              </Form.Group>
            )}
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm={12} md={3}>
              <Form.Label>Ends In</Form.Label>
              {endsInOptions.map((option) => (
                <Form.Check
                  type="radio"
                  key={option}
                  id={option}
                  label={option}
                  name="endsIn"
                  value={option}
                  onChange={handleChangeEndsIn}
                  checked={endsIn === option}
                  custom
                />
              ))}
            </Form.Group>
            {endsIn === 'In' && (
              <Form.Group as={Col}>
                <Form.Label>Date</Form.Label>
                <Form.Control placeholder="yyyy-mm-dd" />
              </Form.Group>
            )}
            {endsIn === 'After' && (
              <Form.Group as={Col}>
                <Form.Label>Ocurrences</Form.Label>
                <Form.Control placeholder="Ocurrences" />
              </Form.Group>
            )}
          </Form.Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ScheduleForm;
