import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

import { useFormik } from 'formik';

export function Filter({ onFilter, onCreate, allowCreate }) {
  const formik = useFormik({
    initialValues: {
      type: '',
      name: '',
    },
    onSubmit: onFilter,
    onReset: onFilter,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row>
        <Form.Group as={Col}>
          <Form.Control
            placeholder="Type"
            name="type"
            as="select"
            value={formik.values.type}
            onChange={formik.handleChange}
          >
            <option value="">All</option>
            <option value="customer">Customer</option>
            <option value="team-group">Team/Group</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control
            placeholder="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </Form.Group>
      </Row>

      <div className="mt-2 d-flex justify-content-end align-items-start">
        <Button type="submit">Filter</Button>
        <Button type="reset" onClick={formik.handleReset} className="ml-2">
          Clear filters
        </Button>
        {allowCreate && (
          <Button variant="secondary" className="ml-2" onClick={onCreate}>
            Add Workout Profile
          </Button>
        )}
      </div>
    </Form>
  );
}
