import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

const Waivers = () => {
  return (
    <Card>
      <Card.Header>
        <Row>
          <Col>
            <span>Waivers</span>
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

export default Waivers;
