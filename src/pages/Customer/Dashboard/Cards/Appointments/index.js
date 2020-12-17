import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import useAuth from '~/contexts/auth';
import useNotification from '~/contexts/notification';
import ModalForm from '~/pages/Appointments/Form';
import * as appointmentService from '~/services/appointment';

import List from './List';

const Appointments = () => {
  const { id } = useParams();
  const [list, setList] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [filter] = useState({ customerId: id });
  const { sendNotification } = useNotification();
  const { hasPermission, ACTIONS, FUNCTIONALITIES } = useAuth();
  const hasPermissionToCreate = hasPermission(
    FUNCTIONALITIES.ACTIVITIES,
    ACTIONS.CREATE
  );
  // const hasPermissionToUpdate = hasPermission(
  //   FUNCTIONALITIES.ACTIVITIES,
  //   ACTIONS.UPDATE
  // );

  const listAppointments = useCallback(async () => {
    try {
      const { data } = await appointmentService.list(1, 3, filter);

      setList(data);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [filter, sendNotification]);

  useEffect(() => {
    listAppointments();
  }, [listAppointments]);

  async function handleDelete(appointmentId) {
    try {
      await appointmentService.cancel(appointmentId);

      sendNotification('Appointment cancelled successfully');
    } catch (error) {
      sendNotification(error.message, false);
    }
  }

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
            <Link to={`/appointments/${id}`}>
              <Button variant="outline-primary" className="ml-2 text-nowrap">
                See More
              </Button>
            </Link>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <List list={list} />
      </Card.Body>
      {openAdd && (
        <ModalForm
          reloadAppointments={listAppointments}
          setClose={setOpenAdd}
          handleDelete={handleDelete}
        />
      )}
    </Card>
  );
};

export default Appointments;
