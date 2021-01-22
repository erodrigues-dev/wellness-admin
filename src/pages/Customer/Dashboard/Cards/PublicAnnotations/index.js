import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

const PublicAnnotations = () => {
  return (
    <Card>
      <Card.Header>
        <Row>
          <Col>
            <span>Public Annotations</span>
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

export default PublicAnnotations;
