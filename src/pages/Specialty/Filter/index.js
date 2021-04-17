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
              Add Specialty
            </Button>
          )}
        </Col>
      </Form>
    </Container>
  );
};

export default Filter;
