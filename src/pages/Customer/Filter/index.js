import React from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';

import { useFormik } from 'formik';

import { Container } from './styles';

function Filter({ onFilter, allowCreate, setOpenNew }) {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    onSubmit: handleSubmit,
    onReset: handleSubmit,
  });

  function handleSubmit(values) {
    onFilter(values);
  }

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Form.Group as={Col} md="6">
            <Form.Control
              placeholder="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Control
              placeholder="E-mail"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
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
                onClick={() => setOpenNew(true)}
                variant="secondary"
                className="ml-2"
              >
                Add Customer
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Filter;
