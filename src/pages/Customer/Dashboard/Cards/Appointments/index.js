import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useAuth from '~/contexts/auth';

import List from './List';

const Appointments = () => {
  const { hasPermission, ACTIONS, FUNCTIONALITIES } = useAuth();
  const hasPermissionToCreate = hasPermission(
    FUNCTIONALITIES.ACTIVITIES,
    ACTIONS.CREATE
  );
  // const hasPermissionToUpdate = hasPermission(
  //   FUNCTIONALITIES.ACTIVITIES,
  //   ACTIONS.UPDATE
  // );

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col className="d-flex align-items-center">
            <span>Appointments</span>
          </Col>
          <Col className="d-flex justify-content-end">
            {hasPermissionToCreate && (
              <Button
                variant="outline-secondary"
                className="ml-2"
                onClick={() => {}}
              >
                Book Now
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

export default Appointments;
