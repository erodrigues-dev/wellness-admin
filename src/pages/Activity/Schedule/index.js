import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import FullCalendar from '@fullcalendar/react';

import { FULLCALENDAR_CONFIG } from '~/consts/fullcalendar';
import { get } from '~/services/activity';

import ScheduleForm from './Form';
import ScheduleFormModel from './Form/model';
import { Container } from './styles';

function Schedule() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    get(id).then(({ data }) => setActivity(data));
  }, [id]);

  function handleSelect({ start, end }) {
    const newFormData = new ScheduleFormModel({
      activityId: id,
      title: activity.name,
      date: start,
      start,
      end,
    });

    setFormData(newFormData);
    setShowForm(true);
  }

  function handleClickEvent({ event }) {
    const data = new ScheduleFormModel(event.extendedProps);

    setShowForm(true);
    setFormData(data);
  }

  function handleResizeEvent({ event }) {
    const model = new ScheduleFormModel(event.extendedProps);
    model.updateDuration(event.start, event.end);
    updateInEventList(model.toEvent());
  }

  function handleDragEvent({
    event: { start, end, extendedProps },
    delta,
    revert,
  }) {
    const model = new ScheduleFormModel(extendedProps);
    if (delta.days !== 0 && model.recurrent) {
      revert();
      return;
    }

    if (model.recurrent) model.updateDuration(start, end);
    else model.updateRange(start, end);

    updateInEventList(model.toEvent());
  }

  /**
   * on handle close modal schedule form
   * @param {string} role
   * @param {ScheduleFormModel} model
   */
  function handleCloseForm(role, model) {
    setShowForm(false);

    if (role === 'save') {
      updateInEventList(model.toEvent());
    }

    if (role === 'delete') {
      setEvents((list) =>
        list.filter((x) => Number(x.id) !== Number(model.id))
      );
    }
  }

  function handleFetchEvents(info, resolve, reject) {
    try {
      resolve(events);
    } catch (error) {
      reject(error);
    }
  }

  function updateInEventList(event) {
    const others = events.filter((x) => Number(x.id) !== Number(event.id));
    setEvents([...others, event]);
  }

  return (
    <Container className="schedule-activity-container">
      <Card body>
        <h3>{activity?.name}</h3>
        <hr />
        <FullCalendar
          {...FULLCALENDAR_CONFIG}
          events={handleFetchEvents}
          select={handleSelect}
          eventDrop={handleDragEvent}
          eventResize={handleResizeEvent}
          eventClick={handleClickEvent}
        />
        <ScheduleForm
          show={showForm}
          data={formData}
          onClose={handleCloseForm}
        />
      </Card>
    </Container>
  );
}

export default Schedule;
