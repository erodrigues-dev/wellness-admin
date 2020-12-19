import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import { useFormik } from 'formik';

import InputDatePicker from '~/components/InputDatePicker';
import * as activityService from '~/services/activity';
import * as customerService from '~/services/customer';

import { Container } from './styles';

function Filter({ onFilter, allowCreate, setOpenAdd }) {
  const { id: customerId } = useParams();
  const history = useHistory();
  const [customers, setCustomers] = useState();
  const [activities, setActivities] = useState();

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

  function resetFilter() {
    onFilter('');

    if (customerId) history.push('/appointments');

    formik.setFieldValue('customerId', '');
  }

  function handleClear(e) {
    formik.handleReset(e);

    resetFilter();
  }

  function handleOpenAdd() {
    onFilter('');

    resetFilter();
    setOpenAdd(true);
  }

  useEffect(() => {
    customerService.listAll().then((response) => setCustomers(response.data));
  }, []);

  useEffect(() => {
    activityService.listAll().then((response) => setActivities(response.data));
  }, []);

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
              <option value="" disabled>
                All customers
              </option>
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
              <option value="" disabled>
                All activities
              </option>
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
              <option value="" disabled>
                All status
              </option>
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
              min={new Date()}
              name="dateStart"
              placeholder="Start Date"
              value={formik.values.dateStart}
              onChange={formik.handleChange}
              isInvalid={formik.touched.dateStart && formik.errors.dateStart}
              isValid={formik.touched.dateStart && !formik.errors.dateStart}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <InputDatePicker
              min={formik.values.dateStart || new Date()}
              name="dateEnd"
              placeholder="End Date"
              value={formik.values.dateEnd}
              onChange={formik.handleChange}
              isInvalid={formik.touched.dateEnd && formik.errors.dateEnd}
              isValid={formik.touched.dateEnd && !formik.errors.dateEnd}
            />
          </Form.Group>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end">
            <Button type="submit">Filter</Button>
            <Button type="reset" className="ml-2" onClick={handleClear}>
              Clear Filters
            </Button>
            {allowCreate && (
              <Button
                variant="secondary"
                className="ml-2 text-nowrap"
                onClick={handleOpenAdd}
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
