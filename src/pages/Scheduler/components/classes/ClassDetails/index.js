import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { RiDoubleQuotesL } from 'react-icons/ri';
import { toast } from 'react-toastify';

import { Button as KendoButton } from '@progress/kendo-react-buttons';
import { Window, WindowActionsBar } from '@progress/kendo-react-dialogs';

import { CalendarLabels } from '~/components/CalendarLabelList';
import { formatDate } from '~/helpers/date';
import { useAppointmentContext } from '~/pages/Scheduler/data/AppointmentContext';
import { useClassContext } from '~/pages/Scheduler/data/ClassContext';
import { useSchedulerContext } from '~/pages/Scheduler/data/SchedulerContext';
import {
  updateAppointmentPartially,
  getAppointment,
} from '~/services/scheduler-appointments';
import { getAppointmentsList } from '~/services/scheduler-classes';

import NoteEdit from './NoteEdit';
import {
  Container,
  DetailsInfo,
  AttendeesContainer,
  AttendeesList,
  AttendeesItem,
  EmptyAttendees,
  AttendeesHeader,
} from './styles';

export function ClassDetails() {
  const { modal, handleRemoveItem } = useSchedulerContext();
  const { addAttndeeInClass } = useAppointmentContext();
  const { openClassEdit, handleCloseModal, selectedClass, fetchingClass } =
    useClassContext();
  const [appointments, setAppointments] = useState({
    loading: true,
    list: [],
  });
  const { selectedId } = modal;
  const [selectedNote, setSelectedNote] = useState({
    id: '',
    notes: '',
  });

  useEffect(() => {
    if (!selectedClass) return;

    setAppointments((prevState) => ({ ...prevState, loading: true }));
    getAppointmentsList(selectedId)
      .then(({ data }) =>
        setAppointments((prevState) => ({
          ...prevState,
          list: data,
        }))
      )
      .catch(() => toast.error('Error on fetch appointments list'))
      .finally(() =>
        setAppointments((prevState) => ({ ...prevState, loading: false }))
      );
  }, [selectedId, selectedClass]);

  const handleInfoDate = () => {
    if (!selectedClass) return '';

    const date = formatDate(new Date(), 'MMMM dd, yyyy');
    const time = formatDate(new Date(selectedClass?.dateStart), 'hh:mmbbb');

    return `${date} at ${time}`;
  };

  const getSlots = () =>
    `${selectedClass?.slots - appointments?.list?.length} slots available`;

  const handleSelectedNote = (value) =>
    setSelectedNote((prevState) => ({ ...prevState, ...value }));

  const handleChangeNoteClick = (appointment) => {
    const { id: appointmentId, notes } = appointment;
    const id = selectedNote?.id === appointmentId ? '' : appointmentId;

    handleSelectedNote({ id, notes });
  };

  const handleLabelChange = async (id, calendarLabel) => {
    try {
      await updateAppointmentPartially({
        id,
        calendarLabelId: calendarLabel?.id ?? null,
      });

      setAppointments((prevState) => ({
        ...prevState,
        list: prevState?.list?.map((x) =>
          id === x?.id ? { ...x, calendarLabel } : x
        ),
      }));

      toast.success('Label saved successfully');
    } catch (error) {
      toast.error('Error on save label');
    }
  };

  const handleDelete = async () => {
    const ok = await handleRemoveItem({ ...selectedClass, type: 'class' });
    if (ok) handleCloseModal();
  };

  const handleOpenAppointmentDetails = async (event, { id }) => {
    if (
      event.target === event.currentTarget ||
      event.target.classList.contains('open-details')
    ) {
      console.log('recuperando appointment na api');
      const { data: appointment } = await getAppointment(id);
      console.log(appointment);
    }
  };

  if (!selectedClass || fetchingClass) {
    return null;
  }

  return (
    <Window
      title="Class details"
      initialWidth={600}
      initialHeight={600}
      onClose={handleCloseModal}
    >
      <Container>
        <DetailsInfo>
          <span className="date">{handleInfoDate()}</span>
          <span className="title">{selectedClass?.activity?.name}</span>
          <span className="slots">
            {selectedClass?.slots} people can schedule this
          </span>
        </DetailsInfo>
        <AttendeesContainer>
          <AttendeesHeader>
            <div>
              <h5>Attendees</h5>
              <span>{getSlots()}</span>
            </div>
            <KendoButton
              disabled={selectedClass?.slots - appointments?.list?.length <= 0}
              onClick={() => addAttndeeInClass(selectedClass)}
            >
              Add attendee
            </KendoButton>
          </AttendeesHeader>
          {appointments?.list?.length > 0 && (
            <AttendeesList>
              {appointments?.list
                ?.filter((x) => !selectedNote?.id || x.id === selectedNote?.id)
                ?.map((appointment) => (
                  <AttendeesItem
                    key={appointment?.id}
                    onClick={(e) =>
                      handleOpenAppointmentDetails(e, appointment)
                    }
                  >
                    <div>
                      <span className="open-details">
                        {appointment?.customer?.name}
                      </span>
                      <KendoButton
                        onClick={() => handleChangeNoteClick(appointment)}
                      >
                        <RiDoubleQuotesL />
                      </KendoButton>
                      <CalendarLabels
                        value={appointment?.calendarLabel?.id}
                        onChange={(label) =>
                          handleLabelChange(appointment?.id, label)
                        }
                      />
                    </div>
                    {selectedNote?.id && (
                      <NoteEdit
                        appointment={appointment}
                        selectedNote={selectedNote}
                        setSelectedNote={setSelectedNote}
                        setAppointments={setAppointments}
                      />
                    )}
                  </AttendeesItem>
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
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
        <Button onClick={openClassEdit}>Edit</Button>
      </WindowActionsBar>
    </Window>
  );
}
