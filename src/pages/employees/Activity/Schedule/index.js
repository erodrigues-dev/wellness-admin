import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import FullCalendar from '@fullcalendar/react';
import uid from 'uid';

import { FULLCALENDAR_CONFIG } from '~/consts/fullcalendar';
import { get } from '~/services/activity';

import ScheduleForm from './Form';
import { Container } from './styles';

function Schedule() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [events, setEvents] = useState([
    {
      id: 1,
      groupId: 1,
      title: 'Teste recorrencia 001',
      start: '2020-08-25T10:00',
      end: '2020-08-25T12:00',
    },
    {
      id: 2,
      groupId: 1,
      title: 'Teste recorrencia 002',
      start: '2020-08-27T10:00',
      end: '2020-08-27T12:00',
    },
  ]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    get(id).then(({ data }) => setActivity(data));

    // setShowForm(true);
  }, [id]);

  function handleSelect({ start, end }) {
    // const newEvent = {
    //   id: uid(),
    //   title: activity.name,
    //   start,
    //   end,
    // };

    // setEvents([...events, newEvent]);
    setShowForm(true);
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

    console.log('#1');
    console.log(updated, relateds);

    const others = events.filter(
      (x) => x.id !== updated.id && !relateds.some((y) => y.id === x.id)
    );
    console.log('#2');
    console.log(others);
    setEvents([...others, updated, ...relateds]);
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
        <ScheduleForm show={showForm} onClose={handleCloseForm} />
      </Card>
    </Container>
  );
}

export default Schedule;
