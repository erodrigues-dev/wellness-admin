import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export function Filter() {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Row>
        <Form.Group as={Col}>
          <Form.Control placeholder="Name" name="name" />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control placeholder="Member" name="memberName" />
        </Form.Group>
      </Row>
      <Row>
        <Col className="d-flex justify-content-end">
          <Button type="submit">Filter</Button>
          <Button className="ml-2" variant="secondary">
            Add Team/Group
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
