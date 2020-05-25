import React from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 24px;
`;

function Filter({ onFilter }) {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
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
              placeholder="Description"
              name="description"
              value={formik.values.description}
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
            <Button
              as={Link}
              to="/profiles/create"
              variant="secondary"
              className="ml-2"
            >
              Add Profile
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Filter;
