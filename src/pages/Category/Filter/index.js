import React from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';

import { useFormik } from 'formik';

import { Container } from './styles';

const Filter = ({ onFilter, allowCreate, handleOpenAdd }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      type: '',
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
          <Form.Group as={Col}>
            <Form.Control
              placeholder="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control
              as="select"
              custom
              placeholder="Type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
            >
              <option value="">All Types</option>
              <option value="activity">Activity</option>
              <option value="package">Package</option>
              <option value="calendar">Calendar</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Col className="d-flex justify-content-end align-items-start">
          <Button type="submit">Filter</Button>
          <Button type="reset" className="ml-2" onClick={formik.handleReset}>
            Clear Filters
          </Button>
          {allowCreate && (
            <Button
              variant="secondary"
              className="ml-2"
              onClick={() => handleOpenAdd(true)}
            >
              Add Category
            </Button>
          )}
        </Col>
      </Form>
    </Container>
  );
};

export default Filter;
