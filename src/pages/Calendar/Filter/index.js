import React from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';

export function Filter({ allowCreate = true, handleAdd }) {
  return (
    <div className="mt-4">
      <Form>
        <Row>
          <Form.Group as={Col}>
            <Form.Control placeholder="Name" name="name" />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control placeholder="Category" name="categoryName" />
          </Form.Group>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end align-items-start">
            <Button type="submit">Filter</Button>
            <Button type="reset" className="ml-2">
              Clear Filters
            </Button>
            {allowCreate && (
              <Button
                variant="secondary"
                className="ml-2"
                onClick={() => handleAdd(true)}
              >
                Add Calendar
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}
