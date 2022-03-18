import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { Window, WindowActionsBar } from '@progress/kendo-react-dialogs';

import { formatDate } from '~/helpers/date';
import { useClassContext } from '~/pages/Scheduler/data/ClassContext';
import { useSchedulerContext } from '~/pages/Scheduler/data/SchedulerContext';
import { getAppointmentsList } from '~/services/scheduler-classes';

import {
  Container,
  DetailsInfo,
  AttendeesContainer,
  AttendeesList,
  AttendeesItem,
  EmptyAttendees,
} from './styles';

export function ClassDetails() {
  const { modal } = useSchedulerContext();
  const { openClassEdit, handleCloseModal, selectedClass } = useClassContext();
  const [appointments, setAppointments] = useState({
    loading: true,
    list: [],
  });
  const { selectedId } = modal;

  useEffect(() => {
    if (!selectedClass) return;

    const date = formatDate(new Date(), 'yyyy-MM-dd');

    setAppointments((prevState) => ({ ...prevState, loading: true }));
    getAppointmentsList(selectedId, date)
      .then(({ data }) =>
        setAppointments((prevState) => ({ ...prevState, list: data }))
      )
      .catch(() => toast.error('Error on fetch appointments list'))
      .finally(() =>
        setAppointments((prevState) => ({ ...prevState, loading: false }))
      );
  }, [selectedId, selectedClass]);

  return (
    <Window
      title="Class details"
      initialWidth={600}
      initialHeight={600}
      onClose={handleCloseModal}
    >
      <Container>
        <DetailsInfo>
          <span className="date">July 04</span>
          <span className="title">ADULT GROUP</span>
          <span className="slots">8 people can schedule this</span>
        </DetailsInfo>
        <AttendeesContainer>
          <h5>Attendees</h5>
          {appointments?.list?.length > 0 && (
            <AttendeesList>
              {appointments?.list?.map(() => (
                <AttendeesItem>teset</AttendeesItem>
              ))}
            </AttendeesList>
          )}
          {appointments?.list?.length <= 0 && (
            <EmptyAttendees>No attendees yet</EmptyAttendees>
          )}
        </AttendeesContainer>
      </Container>
      <WindowActionsBar>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => null}>
          Delete
        </Button>
        <Button onClick={openClassEdit}>Edit</Button>
      </WindowActionsBar>
    </Window>
  );
}
