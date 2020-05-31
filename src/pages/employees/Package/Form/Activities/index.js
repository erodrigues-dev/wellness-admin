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
      const item = activities.find((x) => x.id === id);
      const newList = [{ ...item, quantity: 1 }, ...formik.values.activities];
      formik.setFieldValue('activities', newList);
      formik.setFieldTouched('activities', true);
    } else sendNotification('Select an activity', false);
  };

  const removeItem = (id) => {
    const newList = formik.values.activities.filter((x) => x.id !== id);
    formik.setFieldValue('activities', newList);
    setTimeout(() => formik.setFieldTouched('activities', true));
  };

  const getError = () => {
    const touched = formik.touched.activities;
    if (touched === undefined) return null;

    const err = formik.errors.activities;

    if (typeof err === 'string') return err;

    if (Array.isArray(err)) {
      return err.map((item) => item?.quantity).filter((item) => !!item)[0];
    }

    return null;
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

      <List
        list={formik.values.activities}
        formik={formik}
        onRemove={removeItem}
      />

      <p className="text-error">{getError()}</p>
    </>
  );
};

export default Activities;
