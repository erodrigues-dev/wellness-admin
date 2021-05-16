import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import useNotification from '~/contexts/notification';
import Details from '~/pages/Appointments/Details';
import ModalForm from '~/pages/Appointments/Form';
import * as appointmentService from '~/services/appointment';

import { CardLayout } from '../CardLayout';
import List from './List';

const Appointments = () => {
  const { id } = useParams();
  const [list, setList] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [filter] = useState({ customerId: id });
  const [appointment, setAppointment] = useState();
  const { sendNotification } = useNotification();
  const { hasPermission } = useAuth();
  const hasPermissionToCreate = hasPermission(
    FUNCTIONALITIES.appointments.create
  );

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
      await appointmentService.changeStatus(appointmentId, 'canceled');

      listAppointments();
      sendNotification('Appointment canceled successfully');
    } catch (error) {
      sendNotification(error.message, false);
    }
  }

  return (
    <CardLayout
      title="Appointments"
      buttons={
        <>
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
        </>
      }
    >
      <List
        list={list}
        handleDelete={handleDelete}
        setOpenDetails={() => setOpenDetails(true)}
        setAppointment={setAppointment}
      />

      {openAdd && (
        <ModalForm
          reloadAppointments={listAppointments}
          setClose={setOpenAdd}
          dashboard
        />
      )}
      {openDetails && (
        <Details
          setClose={setOpenDetails}
          appointment={appointment}
          reloadAppointments={listAppointments}
          setAppointment={setAppointment}
        />
      )}
    </CardLayout>
  );
};

export default Appointments;
