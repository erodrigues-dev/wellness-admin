import React from 'react';
import { Modal, Form, Col } from 'react-bootstrap';

// import { Container } from './styles';

function ScheduleForm({ show, onClose }) {
  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Schedule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <h2>Activity name here</h2>
          <Form.Group>
            <Form.Label>Start</Form.Label>
            <Form.Control placeholder="Start" name="start" />
          </Form.Group>
          <Form.Group>
            <Form.Label>End</Form.Label>
            <Form.Control placeholder="End" name="end" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Repeat times</Form.Label>
            <Form.Control placeholder="Repeat times" name="repeat" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Recurrence</Form.Label>
            <Form.Control as="select" name="recurrence" custom>
              <option>Diary</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Week Days</Form.Label>
            {weekDays.map((day) => (
              <Form.Group controlId={day}>
                <Form.Check type="checkbox" label={day} custom />
              </Form.Group>
            ))}
          </Form.Group>
          <Form.Group>
            <Form.Label>Ends In</Form.Label>
            <Form.Check type="radio" label="Never" custom />
            <Form.Check type="radio" label="In" custom />
            <Form.Check type="radio" label="After" custom />
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ScheduleForm;
