import React from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';

import { Container } from './styles';

function Filter({ onFilter, allowCreate }) {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      profile: '',
      specialty: '',
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
          <Form.Group as={Col} md="6">
            <Form.Control
              placeholder="Profile"
              name="profile"
              value={formik.values.profile}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Control
              placeholder="Specialty"
              name="specialty"
              value={formik.values.specialty}
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
                to="/employees/create"
                variant="secondary"
                className="ml-2"
              >
                Add Employee
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Filter;