import React from 'react';
import { Button } from 'react-bootstrap';

import { isToday } from 'date-fns';

import confirmHandler from '~/components/ConfirmAlert/confirmHandler';
import Modal from '~/components/Modal';
import useNotification from '~/contexts/notification';
import { formatToDisplay, toDate, transformIn24h } from '~/helpers/date';
import * as appointmentService from '~/services/appointment';

import { Container } from './styles';

const Details = ({ appointment, setClose, reloadAppointments }) => {
  const { sendNotification } = useNotification();

  async function changeStatus(appointmentId, status) {
    try {
      await appointmentService.changeStatus(appointmentId, status);

      sendNotification(`Appointment set as ${status} successfully`);
      reloadAppointments();
    } catch (error) {
      sendNotification(error.message, false);
    }
    setClose(false);
  }

  function handleChangeStatus(status) {
    changeStatus(appointment.id, status);
  }

  return (
    <Modal title="Details" setClose={setClose}>
      <Container>
        <ul>
          <li>
            <span>Customer:</span> {appointment.customer.name}
          </li>
          <li>
            <span>Activity:</span> {appointment.activity.name}
          </li>
          <li>
            <span>Date:</span> {formatToDisplay(toDate(appointment.date))}
          </li>
          <li>
            <span>Start:</span> {transformIn24h(appointment.start)}
          </li>
          <li>
            <span>End:</span> {transformIn24h(appointment.end)}
          </li>
          <li>
            <span>Status:</span> {appointment.status}
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
