import React from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';

import { Container } from './styles';

function Filter({ onFilter, allowCreate }) {
  const formik = useFormik({
    initialValues: { name: '' },
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
          <Form.Group as={Col}>
            <Form.Control
              placeholder="Name"
              name="name"
              value={formik.values.name}
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
                as={Link}
                to="custom-packages/create"
                variant="secondary"
                className="ml-2"
              >
                Add Custom Package
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Filter;
