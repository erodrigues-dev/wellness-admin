import React, { useEffect, useRef, useState } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { useFormik } from 'formik';

import InputDatePicker from '~/components/InputDatePicker';
import { formatToSubmit, toDate } from '~/helpers/date';
import * as activityService from '~/services/activity';
import * as customerService from '~/services/customer';

import { Container } from './styles';

function Filter({ onFilter, allowCreate, setOpenAdd }) {
  const { id: customerId } = useParams();
  const [customers, setCustomers] = useState();
  const [activities, setActivities] = useState();
  const isMounted = useRef(true);

  const formik = useFormik({
    initialValues: {
      customerId: customerId ?? '',
      activityId: '',
      status: '',
      dateStart: '',
      dateEnd: '',
    },
    onSubmit: handleSubmit,
    onReset: handleSubmit,
  });

  function handleSubmit(values) {
    onFilter(values);
  }

  useEffect(() => {
    customerService
      .listAll()
      .then((response) => isMounted.current && setCustomers(response.data));

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    activityService
      .listAll()
      .then((response) => isMounted.current && setActivities(response.data));

    return () => {
      isMounted.current = false;
    };
  }, []);

  function handleDateChange(e) {
    const { name, value } = e.target;

    formik.setFieldValue(name, formatToSubmit(value));
  }

  function handleDateValue(value) {
    if (value && typeof value === 'string') {
      return toDate(value);
    }

    return null;
  }

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Form.Group as={Col}>
            <Form.Control
              as="select"
              custom
              name="customerId"
              value={formik.values.customerId}
              onChange={formik.handleChange}
            >
              <option value="">All Customers</option>
              {customers?.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control
              as="select"
              custom
              name="activityId"
              value={formik.values.activityId}
              onChange={formik.handleChange}
            >
              <option value="">All Activities</option>
              {activities?.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control
              as="select"
              custom
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
            >
              <option value="">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="arrived">Arrived</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col}>
            <InputDatePicker
              name="dateStart"
              placeholder="Start Date"
              value={() => handleDateValue(formik.values.dateStart)}
              onChange={handleDateChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <InputDatePicker
              name="dateEnd"
              placeholder="End Date"
              value={() => handleDateValue(formik.values.dateEnd)}
              onChange={handleDateChange}
            />
          </Form.Group>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end">
            <Button type="submit">Filter</Button>
            <Button type="reset" className="ml-2" onClick={formik.handleReset}>
              Clear Filters
            </Button>
            {allowCreate && (
              <Button
                variant="secondary"
                className="ml-2 text-nowrap"
                onClick={() => setOpenAdd(true)}
              >
                Add Appointments
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Filter;
