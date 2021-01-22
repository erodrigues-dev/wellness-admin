import React, { useEffect } from 'react';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';

import { useFormik } from 'formik';

import InputDatePicker from '~/components/InputDatePicker';
import InputTimePicker from '~/components/InputTimePicker';

import { FREQUENCY, RECURRENCE_ENDSIN, WEEKDAYS } from './consts';
import ScheduleFormModel from './model';
import schema from './schema';

function ScheduleForm({ show, data, onClose }) {
  const formik = useFormik({
    validationSchema: schema,
    initialValues: new ScheduleFormModel(),
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const model =
      data instanceof ScheduleFormModel ? data : new ScheduleFormModel(data);

    formik.resetForm();
    formik.setValues(model);
    // eslint-disable-next-line
  }, [data]);

  function handleSubmit(values) {
    onClose('save', values);
  }

  function handleCancel() {
    onClose('cancel');
  }

  async function handleDelete() {
    const confirmed = await confirmDelete();
    if (confirmed) onClose('delete', formik.values);
  }

  function isValid(field) {
    return formik.touched[field] && !formik.errors[field];
  }

  function isInvalid(field) {
    return formik.touched[field] && formik.errors[field];
  }

  function confirmDelete() {
    return new Promise((resolve) =>
      confirmAlert({
        title: 'Confirm Delete',
        message: 'Are you sure to do this?',
        onClickOutside: () => resolve(false),
        buttons: [
          {
            label: 'YES',
            onClick: () => resolve(true),
          },
          {
            label: 'NO',
            onClick: () => resolve(false),
          },
        ],
      })
    );
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
            <Form.Group as={Col} sm={12} lg={4}>
              <Form.Label>Date</Form.Label>
              <InputDatePicker
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isValid={isValid('date')}
                isInvalid={isInvalid('date')}
                feedback={formik.errors.date}
              />
            </Form.Group>
            <Form.Group as={Col} sm={6} lg={4}>
              <Form.Label>Start</Form.Label>
              <InputTimePicker
                name="start"
                value={formik.values.start}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isValid={isValid('start')}
                isInvalid={isInvalid('start')}
                feedback={formik.errors.start}
              />
            </Form.Group>
            <Form.Group as={Col} sm={6} lg={4}>
              <Form.Label>End</Form.Label>
              <InputTimePicker
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
                          name="weekdays"
                          value={day.value}
                          checked={formik.values.weekdays.includes(day.value)}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isValid={isValid('weekdays')}
                          isInvalid={isInvalid('weekdays')}
                          custom
                          inline
                        />
                      ))}
                    </Form.Group>
                    {isInvalid('weekdays') && (
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ display: 'block' }}
                      >
                        {formik.errors.weekdays}
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
        {formik.values.id && (
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        )}
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={formik.handleSubmit}>Save</Button>
      </Modal.Footer>
      {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre>
      <pre>{JSON.stringify(formik.errors, null, 2)}</pre> */}
    </Modal>
  );
}

export default ScheduleForm;
