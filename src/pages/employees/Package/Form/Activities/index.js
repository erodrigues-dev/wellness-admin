import React, { useState, useEffect, useRef } from 'react';
import { Form, Col, Button } from 'react-bootstrap';

import useNotification from '~/contexts/notification';
import { listAll } from '~/services/activity';

import List from './List';

const Activities = ({ formik }) => {
  const { sendNotification } = useNotification();
  const activityRef = useRef(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    listAll().then((response) => setActivities(response.data));
  }, []);

  const getItens = () => {
    const selecteds = formik.values.activities;
    return activities.filter((x) => !selecteds.some((y) => y.id === x.id));
  };

  const addItem = () => {
    const id = Number(activityRef.current.value);
    if (id) {
      formik.setFieldTouched('activities', true);
      const item = activities.find((x) => x.id === id);
      const newList = [...formik.values.activities, item];
      formik.setFieldValue('activities', newList);
    } else sendNotification('Select an activity', false);
  };

  const removeItem = (id) => {
    formik.setFieldTouched('activities', true);
    const newList = formik.values.activities.filter((x) => x.id !== id);
    formik.setFieldValue('activities', newList);
  };

  return (
    <>
      <Form.Row>
        <Form.Group as={Col} md="6">
          <Form.Label>Activity</Form.Label>
          <Form.Control as="select" custom ref={activityRef}>
            <option value="">Selecione</option>
            {getItens().map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} className="d-flex align-items-end">
          <Button onClick={addItem}>Add</Button>
        </Form.Group>
      </Form.Row>

      <List list={formik.values.activities} onRemove={removeItem} />

      {formik.touched.activities && formik.values.activities.length === 0 && (
        <p className="text-error">must be add at least one activity</p>
      )}
    </>
  );
};

export default Activities;
