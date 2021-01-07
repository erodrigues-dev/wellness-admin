import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { useFormik } from 'formik';

import * as customerService from '~/services/customer';

import { Container } from './styles';

function Filter({ onFilter, allowCreate, setOpenAdd, customerId }) {
  const [customers, setCustomers] = useState([]);
  const history = useHistory();
  const formik = useFormik({
    initialValues: { customerId: customerId ?? '' },
    onSubmit: handleSubmit,
    onReset: handleSubmit,
  });

  useEffect(() => {
    customerService.listAll().then((response) => setCustomers(response.data));
  }, []);

  function handleSubmit(values) {
    onFilter(values);
    if (customerId) history.push('/orders');
  }

  function resetFilter() {
    onFilter('');

    if (customerId) history.push('/orders');

    formik.setFieldValue('customerId', '');
  }

  function handleClear(e) {
    formik.handleReset(e);
    onFilter('');

    resetFilter();
  }

  function handleOpenAdd() {
    resetFilter();

    setOpenAdd(true);
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
              <option value="">All Customers</option>
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
            <Button
              type="reset"
              className="ml-2 text-nowrap"
              onClick={handleClear}
            >
              Clear Filters
            </Button>
            {allowCreate && (
              <Button
                variant="secondary"
                className="ml-2 text-nowrap"
                onClick={handleOpenAdd}
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
