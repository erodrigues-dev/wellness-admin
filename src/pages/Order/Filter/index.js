import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';

import { useFormik } from 'formik';

import * as customerService from '~/services/customer';

import { Container } from './styles';

function Filter({ onFilter, allowCreate, setOpenAdd }) {
  const [customers, setCustomers] = useState([]);
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
          <Form.Group as={Col} sm={6} md={12}>
            <Form.Control
              as="select"
              custom
              name="customerId"
              value={formik.values.customerId}
              onChange={formik.handleChange}
            >
              <option value={0} disabled>
                Select an option
              </option>
              {customers?.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </Form.Control>
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
                className="ml-2"
                onClick={() => setOpenAdd(true)}
              >
                Add Order
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Filter;
