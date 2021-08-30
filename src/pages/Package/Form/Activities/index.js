import React, { useState, useEffect, useRef } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import useToast from '~/hooks/useToast';
import { listAll } from '~/services/activity';

import List from './List';

const Activities = ({ formik, packageType, display }) => {
  const { sendToast } = useToast();
  const activityRef = useRef(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    listAll()
      .then((response) => setActivities(response.data))
      .catch((error) => toast.error(error.message));
  }, []);

  const getItens = () => {
    const selecteds = formik.values.activities;
    return activities.filter((x) => !selecteds.some((y) => y.id === x.id));
  };

  const addItem = () => {
    const name = activityRef.current.value;
    const item = activities.find((x) => x.name === name);
    if (name && item !== undefined) {
      const newList = [{ ...item, quantity: 1 }, ...formik.values.activities];
      formik.setFieldValue('activities', newList);
      formik.setFieldTouched('activities', true);
      activityRef.current.value = '';
    } else sendToast('Select an activity', false);
  };

  const removeItem = (id) => {
    const newList = formik.values.activities.filter((x) => x.id !== id);
    formik.setFieldValue('activities', newList);
    setTimeout(() => formik.setFieldTouched('activities', true));
  };

  const getError = () => {
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
          <Form.Control
            as="select"
            custom
            defaultValue=""
            name="activities"
            ref={activityRef}
            disabled={display}
            onBlur={formik.handleBlur}
          >
            <option value="" disabled>
              Select an activity
            </option>
            {getItens().map((activity) => (
              <option key={activity.id} value={activity.name}>
                {activity.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} className="d-flex align-items-end">
          <Button onClick={addItem} disabled={display}>
            Add
          </Button>
        </Form.Group>
      </Form.Row>

      <List
        list={formik.values.activities}
        formik={formik}
        onRemove={removeItem}
        packageType={packageType}
        display={display}
      />

      {formik.touched.activities && formik.touched.type && (
        <p className="text-error">{getError()}</p>
      )}
    </>
  );
};

export default Activities;
