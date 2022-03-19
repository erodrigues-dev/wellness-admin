import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { RiDoubleQuotesL } from 'react-icons/ri';
import { toast } from 'react-toastify';

import { Button as KendoButton } from '@progress/kendo-react-buttons';
import { Window, WindowActionsBar } from '@progress/kendo-react-dialogs';

import { CalendarLabels } from '~/components/CalendarLabelList';
import { formatDate } from '~/helpers/date';
import { useClassContext } from '~/pages/Scheduler/data/ClassContext';
import { useSchedulerContext } from '~/pages/Scheduler/data/SchedulerContext';
import {
  getAppointmentsList,
  updateAttendeeNote,
} from '~/services/scheduler-classes';

import {
  Container,
  DetailsInfo,
  AttendeesContainer,
  AttendeesList,
  AttendeesItem,
  EmptyAttendees,
  AttendeesHeader,
} from './styles';

const appointmentMock = [
  {
    id: '2',
    customer: { id: 6, name: 'Teste' },
    calendarLabel: null,
    notes: '',
  },
  {
    id: '3',
    customer: { id: 6, name: 'Teste' },
    calendarLabel: null,
    notes: '',
  },
  {
    id: '4',
    customer: { id: 6, name: 'Teste' },
    calendarLabel: null,
    notes: '',
  },
  {
    id: '5',
    customer: { id: 6, name: 'Teste' },
    calendarLabel: null,
    notes: '',
  },
  {
    id: '6',
    customer: { id: 6, name: 'Teste' },
    calendarLabel: null,
    notes: '',
  },
];

const selectedNoteInitialState = {
  id: '',
  notes: '',
};

export function ClassDetails() {
  const { modal } = useSchedulerContext();
  const { openClassEdit, handleCloseModal, selectedClass } = useClassContext();
  const [appointments, setAppointments] = useState({
    loading: true,
    list: [],
  });
  const { selectedId } = modal;
  const [selectedNote, setSelectedNote] = useState(selectedNoteInitialState);

  useEffect(() => {
    if (!selectedClass) return;

    // const date = formatDate(new Date(), 'yyyy-MM-dd');

    setAppointments((prevState) => ({ ...prevState, loading: true }));
    getAppointmentsList(selectedId, selectedClass?.dateStart)
      .then(({ data }) =>
        setAppointments((prevState) => ({
          ...prevState,
          list: [...data, ...appointmentMock],
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
    const time = formatDate(new Date(selectedClass?.dateStart), 'h:mbbb');

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

  const handleNotesChange = ({ target }) => {
    handleSelectedNote({ notes: target.value });
  };

  const saveNote = async () => {
    try {
      await updateAttendeeNote(selectedNote);

      setSelectedNote(selectedNoteInitialState);
      toast.success('Notes saved successfully');
    } catch (error) {
      toast.error('Error on save notes');
    }
  };

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
            <h5>Attendees</h5>
            <span>{getSlots()}</span>
          </AttendeesHeader>
          {appointments?.list?.length > 0 && (
            <AttendeesList>
              {appointments?.list
                ?.filter((x) => !selectedNote?.id || x.id === selectedNote?.id)
                ?.map((appointment) => (
                  <AttendeesItem key={appointment?.id}>
                    <div>
                      <input type="checkbox" />
                      <span>{appointment?.customer?.name}</span>
                      <KendoButton
                        onClick={() => handleChangeNoteClick(appointment)}
                      >
                        <RiDoubleQuotesL />
                      </KendoButton>
                      <CalendarLabels />
                    </div>
                    {selectedNote?.id && (
                      <Form.Group>
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="notes"
                          onChange={handleNotesChange}
                          value={selectedNote?.notes}
                        />
                        <div className="buttons">
                          <Button
                            variant="secondary"
                            onClick={() =>
                              setSelectedNote(selectedNoteInitialState)
                            }
                          >
                            Cancel
                          </Button>
                          <Button onClick={saveNote}>Save</Button>
                        </div>
                      </Form.Group>
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
        <Button variant="danger" onClick={() => null}>
          Delete
        </Button>
        <Button onClick={openClassEdit}>Edit</Button>
      </WindowActionsBar>
    </Window>
  );
}
