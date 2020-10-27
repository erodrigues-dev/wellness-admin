import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useAuth from '~/contexts/auth';

import List from './List';

const Orders = () => {
  const { hasPermission, ACTIONS, FUNCTIONALITIES } = useAuth();
  const hasPermissionToCreate = hasPermission(
    FUNCTIONALITIES.ACTIVITIES,
    ACTIONS.CREATE
  );

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col className="d-flex align-items-center">
            <span>Orders</span>
          </Col>
          <Col className="d-flex justify-content-end">
            {hasPermissionToCreate && (
              <Button
                variant="outline-secondary"
                className="ml-2"
                onClick={() => {}}
              >
                Checkout
              </Button>
            )}
            <Link to="/discounts">
              <Button variant="outline-primary" className="ml-2">
                See More
              </Button>
            </Link>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <List />
      </Card.Body>
    </Card>
  );
};

export default Orders;
