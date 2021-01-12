import React from 'react';
import { Button } from 'react-bootstrap';

import { isToday } from 'date-fns';

import confirmHandler from '~/components/ConfirmAlert/confirmHandler';
import { Status } from '~/components/Label/styles';
import Modal from '~/components/Modal';
import { APPOINTMENTS_STATUS_COLOR } from '~/consts/labelColors';
import useNotification from '~/contexts/notification';
import { formatToDisplay, toDate, transformIn24h } from '~/helpers/date';
import * as appointmentService from '~/services/appointment';

import { Container } from './styles';

const Details = ({
  appointment,
  setAppointment,
  setClose,
  reloadAppointments,
}) => {
  const { sendNotification } = useNotification();

  async function changeStatus(appointmentId, status) {
    try {
      await appointmentService.changeStatus(appointmentId, status);

      sendNotification(`Appointment set as ${status} successfully`);
      reloadAppointments();

      setAppointment({ ...appointment, status });
    } catch (error) {
      sendNotification(error.message, false);
    }
  }

  function handleChangeStatus(status) {
    changeStatus(appointment.id, status);
  }

  return (
    <Modal title="Details" setClose={setClose}>
      <Container>
        <ul>
          <li>
            <span>Customer:</span>
            <span className="appointment"> {appointment.customer.name}</span>
          </li>
          <li>
            <span>Activity:</span>
            <span className="appointment"> {appointment.activity.name}</span>
          </li>
          <li>
            <span>Date:</span>
            <span className="appointment">
              {formatToDisplay(toDate(appointment.date))}
            </span>
          </li>
          <li>
            <span>Start:</span>
            <span className="appointment">
              {transformIn24h(appointment.start)}
            </span>
          </li>
          <li>
            <span>End:</span>
            <span className="appointment">
              {transformIn24h(appointment.end)}
            </span>
          </li>
          <li>
            <span>Status:</span>
            <div className="appointment">
              <Status
                color={APPOINTMENTS_STATUS_COLOR}
                status={appointment.status}
              >
                {appointment.status}
              </Status>
            </div>
          </li>
        </ul>
        <div className="buttons">
          {appointment.status === 'scheduled' &&
            toDate(appointment.date) >= new Date() && (
              <Button
                variant="danger"
                onClick={() =>
                  confirmHandler(
                    'Are you sure you want to cancel this appointment?',
                    () => handleChangeStatus('canceled')
                  )
                }
              >
                Cancel Schedule
              </Button>
            )}
          {appointment.status === 'scheduled' &&
            isToday(toDate(appointment.date)) && (
              <Button
                variant="secondary"
                className="ml-2"
                onClick={() => handleChangeStatus('arrived')}
              >
                Set Arrived
              </Button>
            )}
          {appointment.status === 'arrived' && (
            <Button
              variant="secondary"
              className="ml-2"
              onClick={() => handleChangeStatus('completed')}
            >
              Set Completed
            </Button>
          )}
        </div>
      </Container>
    </Modal>
  );
};

export default Details;
