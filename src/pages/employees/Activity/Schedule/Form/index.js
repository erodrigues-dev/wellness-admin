import React, { useEffect } from 'react';
import { Modal, Form, Col, Button } from 'react-bootstrap';

import { useFormik } from 'formik';

import InputDatePicker from '~/components/InputDatePicker';
import InputDateTimePicker from '~/components/InputDateTimePicker';

import { WEEKDAYS, FREQUENCY, RECURRENCE_ENDSIN } from './consts';
import ScheduleFormModel from './model';
import schema from './schema';

function ScheduleForm({ show, data, onClose }) {
  const formik = useFormik({
    validationSchema: schema,
    initialValues: new ScheduleFormModel(),
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    // console.log('receive form value -> ', data);
    const values = data || new ScheduleFormModel();
    formik.resetForm();
    formik.setValues(values);
  }, [data]);

  function handleSubmit(values) {
    onClose('save', values);
  }

  function handleCancel() {
    onClose('cancel');
  }

  function isValid(field) {
    return formik.touched[field] && !formik.errors[field];
  }

  function isInvalid(field) {
    return formik.touched[field] && formik.errors[field];
  }

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
                isValid={isValid('title')}
                isInvalid={isInvalid('title')}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.title}
              </Form.Control.Feedback>
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
                isValid={isValid('color')}
                isInvalid={isInvalid('color')}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.color}
              </Form.Control.Feedback>
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
                isValid={isValid('start')}
                isInvalid={isInvalid('start')}
                feedback={formik.errors.start}
              />
            </Form.Group>
            <Form.Group as={Col} lg="6">
              <Form.Label>End</Form.Label>
              <InputDateTimePicker
                name="end"
                value={formik.values.end}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isValid={isValid('end')}
                isInvalid={isInvalid('end')}
                feedback={formik.errors.end}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Check
              label="Recurrent"
              name="recurrent"
              id="recurrent"
              checked={formik.values.recurrent}
              onChange={formik.handleChange}
              value
              custom
            />
          </Form.Group>
          {formik.values.recurrent && (
            <>
              <Form.Row>
                <Form.Group as={Col} sm={3} md={6}>
                  <Form.Label>Repeat every</Form.Label>
                  <Form.Control
                    placeholder="Repeat every"
                    name="repeatEvery"
                    value={formik.values.repeatEvery}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isValid={isValid('repeatEvery')}
                    isInvalid={isInvalid('repeatEvery')}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.repeatEvery}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Frequency</Form.Label>
                  <Form.Control
                    as="select"
                    name="frequency"
                    value={formik.values.frequency}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isValid={isValid('frequency')}
                    isInvalid={isInvalid('frequency')}
                    custom
                  >
                    {FREQUENCY.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.frequency}
                  </Form.Control.Feedback>
                </Form.Group>
                {formik.values.frequency === 'WEEKLY' && (
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
                          isValid={isValid('weekDays')}
                          isInvalid={isInvalid('weekDays')}
                          custom
                          inline
                        />
                      ))}
                    </Form.Group>
                    {isInvalid('weekDays') && (
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ display: 'block' }}
                      >
                        {formik.errors.weekDays}
                      </Form.Control.Feedback>
                    )}
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
                      isValid={isValid('endsIn')}
                      isInvalid={isInvalid('endsIn')}
                      custom
                    />
                  ))}
                </Form.Group>
                {formik.values.endsIn === 'IN' && (
                  <Form.Group as={Col} md={6}>
                    <Form.Label>Until</Form.Label>
                    <InputDatePicker
                      name="until"
                      value={formik.values.until}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isValid={isValid('until')}
                      isInvalid={isInvalid('until')}
                      feedback={formik.errors.until}
                    />
                  </Form.Group>
                )}
                {formik.values.endsIn === 'AFTER' && (
                  <Form.Group as={Col} md={4}>
                    <Form.Label>Ocurrences</Form.Label>
                    <Form.Control
                      placeholder="Ocurrences"
                      name="ocurrences"
                      value={formik.values.ocurrences}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isValid={isValid('ocurrences')}
                      isInvalid={isInvalid('ocurrences')}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.ocurrences}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}
              </Form.Row>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={formik.handleSubmit}>Save</Button>
      </Modal.Footer>
      <pre>{JSON.stringify(formik.values, null, 2)}</pre>
      <pre>{JSON.stringify(formik.errors, null, 2)}</pre>
    </Modal>
  );
}

export default ScheduleForm;
