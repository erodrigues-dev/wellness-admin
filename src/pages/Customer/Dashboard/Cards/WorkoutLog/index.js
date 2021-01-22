import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

const WorkoutLog = () => {
  return (
    <Card>
      <Card.Header>
        <Row>
          <Col>
            <span>Workout Profile</span>
          </Col>
          <Col>
            <Button variant="outline-primary">Book now</Button>
            <Button variant="outline-primary">See More</Button>
          </Col>
        </Row>
      </Card.Header>
    </Card>
  );
};

export default WorkoutLog;
