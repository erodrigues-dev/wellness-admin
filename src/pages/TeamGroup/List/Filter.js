import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

import { useFormik } from 'formik';

export function Filter({ allowCreate, onCreate, onFilter }) {
  const formik = useFormik({
    initialValues: {
      name: '',
      memberName: '',
    },
    onSubmit: onFilter,
    onReset: onFilter,
  });

  return (
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
            placeholder="Member"
            name="memberName"
            value={formik.values.memberName}
            onChange={formik.handleChange}
          />
        </Form.Group>
      </Row>
      <Row>
        <Col className="d-flex justify-content-end">
          <Button type="submit">Filter</Button>
          <Button type="reset" className="ml-2" onClick={formik.handleReset}>
            Clear Filter
          </Button>
          {allowCreate && (
            <Button className="ml-2" variant="secondary" onClick={onCreate}>
              Add Team/Group
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  );
}
