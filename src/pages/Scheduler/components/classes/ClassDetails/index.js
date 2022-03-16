import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { Window, WindowActionsBar } from '@progress/kendo-react-dialogs';

import Loading from '~/components/Loading';
import { getClassById } from '~/services/scheduler-classes';

import { useClassContext } from '../../../data/ClassContext';
import { useSchedulerContext } from '../../../data/SchedulerContext';

export function ClassDetailsModal() {
  const {
    modal: { type, isOpen, isDisplay },
  } = useSchedulerContext();

  if (type === 'class' && isDisplay && isOpen) {
    return <ClassDetails />;
  }

  return null;
}

function ClassDetails() {
  const { modal, closeModal } = useSchedulerContext();
  const { fetchActivities } = useClassContext();
  const { selectedId } = modal;
  const [fetchingClass, setFetchingClass] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    if (!selectedId) return;

    setFetchingClass(true);
    getClassById(selectedId)
      .then(({ data }) => setSelectedClass(data))
      .catch(() => toast.error('Error on fetch the selected calendar'))
      .finally(() => setFetchingClass(false));
  }, [selectedId]);

  useEffect(() => {
    if (selectedClass?.calendarId) fetchActivities(selectedClass?.calendarId);
  }, [fetchActivities, selectedClass]);

  if (fetchingClass) {
    return <Loading />;
  }

  return (
    <Window
      title="Class details"
      initialWidth={600}
      initialHeight={600}
      onClose={closeModal}
    >
      <WindowActionsBar>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button>Edit</Button>
      </WindowActionsBar>
    </Window>
  );
}
