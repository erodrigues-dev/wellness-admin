import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

export const CardLayout = ({ title, buttons, children }) => (
  <Card>
    <Card.Header>
      <Row>
        <Col className="d-flex align-items-center">
          <span>{title}</span>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          {buttons}
        </Col>
      </Row>
    </Card.Header>
    <Card.Body>{children}</Card.Body>
  </Card>
);
