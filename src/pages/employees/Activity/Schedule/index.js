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

  const [newId, setNewId] = useState(0);

  useEffect(() => {
    get(id).then(({ data }) => setActivity(data));
  }, [id]);

  function getNewFormData() {
    const model = new ScheduleFormModel();
    model.title = activity.name;
    return model;
  }

  function handleSelect({ start, end }) {
    const newFormData = getNewFormData();
    newFormData.start = new Date(start);
    newFormData.end = new Date(end);
    setFormData(newFormData);
    setShowForm(true);
  }

  function handleClickEvent({ event }) {
    console.log('click in event', event);
    const eventFormData = ScheduleFormModel.fromEvent(event);

    setShowForm(true);
    setFormData(eventFormData);
  }

  function handleUpdateEvent({ event, relatedEvents }) {
    console.log('update event');

    const updated = {
      id: Number(event.id),
      groupId: Number(event.groupId),
      title: event.title,
      start: event.start,
      end: event.end,
    };

    const relateds = relatedEvents.map((related) => ({
      id: Number(related.id),
      groupId: Number(related.groupId),
      title: related.title,
      start: related.start,
      end: related.end,
    }));

    const others = events.filter(
      (x) => x.id !== updated.id && !relateds.some((y) => y.id === x.id)
    );

    setEvents([...others, updated, ...relateds]);
  }

  /**
   * on handle close modal schedule form
   * @param {string} role
   * @param {ScheduleFormModel} model
   */
  function handleCloseForm(role, model) {
    setShowForm(false);

    if (role === 'save') {
      const event = model.toEvent();
      if (!event.id) {
        event.id = newId + 1;
        setNewId((_id) => _id + 1);
      }
      const others = events.filter((x) => Number(x.id) !== Number(event.id));
      setEvents([...others, event]);
    }
  }

  function handleFetchEvents(info, resolve, reject) {
    try {
      resolve(events);
    } catch (error) {
      reject(error);
    }
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
          eventDrop={handleUpdateEvent}
          eventResize={handleUpdateEvent}
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
