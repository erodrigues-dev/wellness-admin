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
    initialValues: { customerId: customerId ?? 0, relationName: '' },
    onSubmit: handleSubmit,
    onReset: handleSubmit,
  });

  useEffect(() => {
    customerService.listAll().then((response) => setCustomers(response.data));
  }, []);

  function handleSubmit(values) {
    onFilter(values);
  }

  function handleClear(e) {
    formik.handleReset(e);

    if (customerId) history.push('/discounts');
    formik.setFieldValue('customerId', 0);
  }

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Form.Group as={Col} sm={6}>
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
          <Form.Group as={Col} sm={6}>
            <Form.Control
              placeholder="Activity/Package"
              name="relationName"
              value={formik.values.relationName}
              onChange={formik.handleChange}
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
                className="ml-2"
                onClick={() => setOpenAdd(true)}
              >
                Add Discount
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Filter;
