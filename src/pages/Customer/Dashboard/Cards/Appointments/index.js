import React, { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useAuth from '~/contexts/auth';
import ModalForm from '~/pages/Appointments/Form';

import List from './List';

const Appointments = () => {
  const [openAdd, setOpenAdd] = useState(false);
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
                className="ml-2 text-nowrap"
                onClick={() => setOpenAdd(true)}
              >
                Book Now
              </Button>
            )}
            <Link to="/appointments">
              <Button variant="outline-primary" className="ml-2 text-nowrap">
                See More
              </Button>
            </Link>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <List />
      </Card.Body>
      {openAdd && <ModalForm reloadAppointments="" setClose={setOpenAdd} />}
    </Card>
  );
};

export default Appointments;
