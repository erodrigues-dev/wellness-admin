import React from 'react';
import { Button } from 'react-bootstrap';

import confirmHandler from '~/components/ConfirmAlert/confirmHandler';
import Modal from '~/components/Modal';
import useNotification from '~/contexts/notification';
import { formatToDisplay, toDate, transformIn24h } from '~/helpers/date';
import * as appointmentService from '~/services/appointment';

import { Container } from './styles';

const Details = ({ appointment, setClose, listAppointments }) => {
  const { sendNotification } = useNotification();

  async function handleDelete(appointmentId) {
    try {
      await appointmentService.cancel(appointmentId);

      sendNotification('Appointment cancelled successfully');
      listAppointments();
    } catch (error) {
      sendNotification(error.message, false);
    }
  }

  function handleConfirm() {
    handleDelete(appointment.id);
    setClose(false);
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
          {!(
            appointment.status === 'canceled' ||
            appointment.status === 'completed' ||
            toDate(appointment.date) < new Date()
          ) && (
            <Button
              variant="danger"
              onClick={() =>
                confirmHandler(
                  'Are you sure you want to cancel this appointment?',
                  handleConfirm
                )
              }
            >
              Cancel Schedule
            </Button>
          )}
          {appointment.status === 'scheduled' && (
            <Button variant="secondary" className="ml-2">
              Set Arrived
            </Button>
          )}
          {appointment.status === 'completed' && (
            <Button variant="secondary" className="ml-2">
              Set Completed
            </Button>
          )}
        </div>
      </Container>
    </Modal>
  );
};

export default Details;
