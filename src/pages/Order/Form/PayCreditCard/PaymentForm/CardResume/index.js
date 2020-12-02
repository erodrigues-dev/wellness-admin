import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

const CardResume = ({ selectedCard }) => {
  return (
    <div>
      <Form.Group>
        <Form.Label>Credit Card Number</Form.Label>
        <Form.Control
          value={`**** **** **** ${selectedCard.last_4}`}
          name="sq-card-number"
          disabled={selectedCard}
          onChange={() => {}}
        />
      </Form.Group>

      <Row className="d-flex ">
        <Col md="3">
          <Form.Group>
            <Form.Label>Expiration Date</Form.Label>
            <Form.Control
              name="sq-expiration-date"
              disabled={selectedCard}
              value={`${selectedCard.exp_month}/${selectedCard.exp_year}`}
              onChange={() => {}}
            />
          </Form.Group>
        </Col>

        <Col md="3">
          <Form.Group>
            <Form.Label>CVV</Form.Label>
            <Form.Control
              name="sq-cvv"
              defaultValue="***"
              disabled={selectedCard}
            />
          </Form.Group>
        </Col>

        <Col md="6">
          <Form.Group>
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              name="sq-postal-code"
              disabled={selectedCard}
              defaultValue="********"
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default CardResume;
