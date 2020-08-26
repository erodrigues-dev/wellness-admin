import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import FullCalendar from '@fullcalendar/react';
import uid from 'uid';

import { FULLCALENDAR_CONFIG } from '~/consts/fullcalendar';
import { get } from '~/services/activity';

import Form from './Form';
import { Container } from './styles';

function Schedule() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    get(id).then(({ data }) => setActivity(data));
  }, [id]);

  function handleSelect({ start, end }) {
    const newEvent = {
      id: uid(),
      title: activity.name,
      start,
      end,
    };

    setEvents([...events, newEvent]);
  }

  function handleUpdateEvent({ event }) {
    console.log('update event -> ', event.id);
    const drop = {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
    };

    const others = events.filter((x) => x.id !== drop.id);
    setEvents([...others, drop]);
  }

  function handleClickEvent({ event }) {
    console.log('click event -> ', event.id);
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
  }

  return (
    <Container className="activity-container">
      <Card body>
        <h3>
          Schedule
          <small>{` (${activity?.name})`}</small>
        </h3>
        <hr />
        <FullCalendar
          {...FULLCALENDAR_CONFIG}
          events={events}
          select={handleSelect}
          eventDrop={handleUpdateEvent}
          eventResize={handleUpdateEvent}
          eventClick={handleClickEvent}
        />
        <Form show={showForm} onClose={handleCloseForm} />
      </Card>
    </Container>
  );
}

export default Schedule;
