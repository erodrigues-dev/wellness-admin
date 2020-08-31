import React from 'react';
import { Modal, Form, Col, Button } from 'react-bootstrap';

import { useFormik } from 'formik';

import InputDatePicker from '~/components/InputDatePicker';
import InputDateTimePicker from '~/components/InputDateTimePicker';

import { WEEKDAYS, RECURRENCE, RECURRENCE_ENDSIN } from './consts';
import ScheduleFormModel from './model';

function ScheduleForm({ show, onClose }) {
  const formik = useFormik({
    initialValues: new ScheduleFormModel(),
    onSubmit: handleSubmit,
  });

  function handleSubmit(values) {}

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.title && formik.errors.title}
                isValid={formik.touched.title && !formik.errors.title}
              />
            </Form.Group>
            <Form.Group as={Col} sm={2}>
              <Form.Label>Color</Form.Label>
              <Form.Control
                name="color"
                type="color"
                style={{ padding: 0 }}
                value={formik.values.color}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.color && formik.errors.color}
                isValid={formik.touched.color && !formik.errors.color}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} lg="6">
              <Form.Label>Start</Form.Label>
              <InputDateTimePicker
                name="start"
                value={formik.values.start}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.start && formik.errors.start}
                isValid={formik.touched.start && !formik.errors.start}
              />
            </Form.Group>
            <Form.Group as={Col} lg="6">
              <Form.Label>End</Form.Label>
              <InputDateTimePicker
                name="end"
                value={formik.values.end}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.end && formik.errors.end}
                isValid={formik.touched.end && !formik.errors.end}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm={3} md={6}>
              <Form.Label>Repeat every</Form.Label>
              <Form.Control
                placeholder="Repeat times"
                name="repeat"
                value={formik.values.repeat}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.repeat && formik.errors.repeat}
                isValid={formik.touched.repeat && !formik.errors.repeat}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Recurrence</Form.Label>
              <Form.Control
                as="select"
                name="recurrence"
                value={formik.values.recurrence}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.recurrence && formik.errors.recurrence
                }
                isValid={formik.touched.recurrence && !formik.errors.recurrence}
                custom
              >
                {RECURRENCE.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {formik.values.recurrence === 'weekly' && (
              <Form.Group as={Col} md={12}>
                <Form.Label>Week days</Form.Label>
                <Form.Group id="weekday">
                  {WEEKDAYS.map((day) => (
                    <Form.Check
                      type="checkbox"
                      key={day.value}
                      id={day.value}
                      label={day.name}
                      name="weekDays"
                      value={day.value}
                      checked={formik.values.weekDays.includes(day.value)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.weekDays && formik.errors.weekDays
                      }
                      isValid={
                        formik.touched.weekDays && !formik.errors.weekDays
                      }
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
              <Form.Label>Ends in</Form.Label>
              {RECURRENCE_ENDSIN.map((option) => (
                <Form.Check
                  type="radio"
                  key={option.value}
                  id={option.value}
                  label={option.name}
                  name="endsIn"
                  value={option.value}
                  checked={formik.values.endsIn === option.value}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.endsIn && formik.errors.endsIn}
                  isValid={formik.touched.endsIn && !formik.errors.endsIn}
                  custom
                />
              ))}
            </Form.Group>
            {formik.values.endsIn === 'in' && (
              <Form.Group as={Col} md={6}>
                <Form.Label>Expiration</Form.Label>
                <InputDatePicker
                  name="expiration"
                  value={formik.values.expiration}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.expiration && formik.errors.expiration
                  }
                  isValid={
                    formik.touched.expiration && !formik.errors.expiration
                  }
                />
              </Form.Group>
            )}
            {formik.values.endsIn === 'after' && (
              <Form.Group as={Col} md={4}>
                <Form.Label>Ocurrences</Form.Label>
                <Form.Control
                  placeholder="Ocurrences"
                  name="ocurrences"
                  value={formik.values.ocurrences}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.ocurrences && formik.errors.ocurrences
                  }
                  isValid={
                    formik.touched.ocurrences && !formik.errors.ocurrences
                  }
                />
              </Form.Group>
            )}
          </Form.Row>
        </Form>
        <Form.Row>
          <pre as={Col}>{JSON.stringify(formik.values, null, 2)}</pre>
          <pre as={Col}>{JSON.stringify(formik.touched, null, 2)}</pre>
          <pre as={Col}>{JSON.stringify(formik.errors, null, 2)}</pre>
        </Form.Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">Cancel</Button>
        <Button onClick={formik.handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ScheduleForm;
