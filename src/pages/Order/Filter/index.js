import React from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { useFormik } from 'formik';

import { Container } from './styles';

function Filter({ onFilter, allowCreate, setOpenAdd, customerId }) {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      customerId: customerId ?? '',
      customerName: '',
    },
    onSubmit: handleSubmit,
    onReset: handleSubmit,
  });

  function handleSubmit(values) {
    onFilter(values);
    if (customerId) history.push('/orders');
  }

  function resetFilter() {
    onFilter(null);
    if (customerId) history.push('/orders');
    formik.setFieldValue('customerId', '');
  }

  function handleClear(e) {
    formik.handleReset(e);
    onFilter(null);
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
              type="text"
              name="customerName"
              value={formik.values.customerName}
              onChange={formik.handleChange}
              placeholder="Customer name"
              disabled={Boolean(customerId)}
            />
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
