import React from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';

import { useFormik } from 'formik';

export function Filter({ allowCreate = true, onCreate, onFilter }) {
  const formik = useFormik({
    initialValues: {
      name: '',
      categoryName: '',
    },
    onSubmit: onFilter,
    onReset: onFilter,
  });

  return (
    <div className="mt-4">
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
              placeholder="Category"
              name="categoryName"
              value={formik.values.categoryName}
              onChange={formik.handleChange}
            />
          </Form.Group>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end align-items-start">
            <Button type="submit">Filter</Button>
            <Button type="reset" className="ml-2" onClick={formik.handleReset}>
              Clear Filters
            </Button>
            {allowCreate && (
              <Button variant="secondary" className="ml-2" onClick={onCreate}>
                Add Calendar
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}
