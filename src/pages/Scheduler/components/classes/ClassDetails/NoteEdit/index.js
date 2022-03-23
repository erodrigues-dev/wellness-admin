import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { updateAppointmentPartially } from '~/services/scheduler-appointments';

const selectedNoteInitialState = {
  id: '',
  notes: '',
};

const NoteEdit = ({
  appointment,
  selectedNote,
  setSelectedNote,
  setAppointments,
}) => {
  const saveNote = async () => {
    try {
      await updateAppointmentPartially({
        id: appointment?.id,
        notes: selectedNote?.notes,
      });

      setAppointments((prevState) => ({
        ...prevState,
        list: prevState?.list?.map((x) =>
          appointment?.id === x?.id ? { ...x, notes: selectedNote?.notes } : x
        ),
      }));
      setSelectedNote(selectedNoteInitialState);

      toast.success('Notes saved successfully');
    } catch (error) {
      toast.error('Error on save notes');
    }
  };

  const handleNotesChange = ({ target }) => {
    setSelectedNote((prevState) => ({ ...prevState, notes: target.value }));
  };

  return (
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
          onClick={() => setSelectedNote(selectedNoteInitialState)}
        >
          Cancel
        </Button>
        <Button onClick={saveNote}>Save</Button>
      </div>
    </Form.Group>
  );
};

export default NoteEdit;
