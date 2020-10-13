import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

const PrivateAnnotations = () => {
  return (
    <Card>
      <Card.Header>
        <Row>
          <Col>
            <span>Private Annotations</span>
          </Col>
          <Col>
            <Button variant="outline-primary">Add</Button>
            <Button variant="outline-primary">See More</Button>
          </Col>
        </Row>
      </Card.Header>
    </Card>
  );
};

export default PrivateAnnotations;
