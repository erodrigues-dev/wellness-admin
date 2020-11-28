import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';

import { useFormik } from 'formik';

import InputDateTimePicker from '~/components/InputDateTimePicker';
import * as customerService from '~/services/customer';

import { Container } from './styles';

function Filter({ onFilter, allowCreate, setOpenAdd }) {
  const [, setCustomers] = useState([]);
  const formik = useFormik({
    initialValues: { customerId: 0 },
    onSubmit: handleSubmit,
    onReset: handleSubmit,
  });

  useEffect(() => {
    customerService.listAll().then((response) => setCustomers(response.data));
  }, []);

  function handleSubmit(values) {
    onFilter(values);
  }

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Form.Group as={Col}>
            <Form.Control
              placeholder="Customer Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control
              placeholder="Activity Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <InputDateTimePicker
              min={new Date()}
              name="expiration"
              value={formik.values.expiration}
              onChange={formik.handleChange}
              isInvalid={formik.touched.expiration && formik.errors.expiration}
              isValid={formik.touched.expiration && !formik.errors.expiration}
            />
          </Form.Group>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end">
            <Button type="submit">Filter</Button>
            <Button
              type="reset"
              className="ml-2 text-nowrap"
              onClick={formik.handleReset}
            >
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
