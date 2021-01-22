import React, { useEffect, useState, useCallback } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import FullCalendar from '@fullcalendar/react';

import { FULLCALENDAR_CONFIG } from '~/consts/fullcalendar';
import useNotification from '~/contexts/notification';
import { get } from '~/services/activity';
import * as service from '~/services/schedule';

import ScheduleForm from './Form';
import ScheduleFormModel from './Form/model';
import { Container } from './styles';

function Schedule() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);
  const { sendNotification } = useNotification();

  const getActivity = useCallback(
    async (activityId) => {
      try {
        const response = await get(activityId);

        setActivity(response.data);
      } catch (error) {
        sendNotification(error.message, false);
      }
    },
    [sendNotification]
  );

  useEffect(() => {
    getActivity(id);
  }, [getActivity, id]);

  const handleFetchEvents = useCallback(
    async ({ start, end }, resolve, reject) => {
      if (activity) {
        try {
          const { data: list } = await service.list(start, end, id);
          const eventsFromApi = list.map((item) =>
            ScheduleFormModel.fromApi(item).toEvent()
          );
          setEvents(eventsFromApi);
          resolve(events);
        } catch (error) {
          reject(error);
        }
      }
    },
    [id, activity, events]
  );

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

  async function handleResizeEvent({ event, revert }) {
    try {
      const model = new ScheduleFormModel(event.extendedProps);
      model.updateDuration(event.start, event.end);
      await sendToApi(model);
      updateInEventList(model.toEvent());
    } catch (error) {
      revert();
    }
  }

  async function handleDragEvent({
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

    try {
      await sendToApi(model);
      updateInEventList(model.toEvent());
    } catch (error) {
      revert();
    }
  }

  /**
   * on handle close modal schedule form
   * @param {string} role
   * @param {ScheduleFormModel} model
   */
  async function handleCloseForm(role, model) {
    try {
      if (role === 'save') {
        const response = await sendToApi(model);
        if (response.data?.id) model.setId(response.data?.id);
        updateInEventList(model.toEvent());
      }

      if (role === 'delete') {
        await deleteInApi(model.id);
        setEvents((list) =>
          list.filter((x) => Number(x.id) !== Number(model.id))
        );
      }

      setShowForm(false);
    } catch (error) {
      sendNotification('Unexpected error has ocurred', false);
    }
  }

  function updateInEventList(event) {
    const others = events.filter((x) => Number(x.id) !== Number(event.id));
    setEvents([...others, event]);
  }

  /**
   * @param {ScheduleFormModel} model
   */
  function sendToApi(model) {
    const data = model.toApi();
    if (!model.id) return service.create(data);
    return service.udpate(data);
  }

  function deleteInApi(scheduleId) {
    return service.destroy(scheduleId);
  }

  if (!activity) return null;

  return (
    <Container className="schedule-activity-container">
      <Card body>
        <h3>{activity?.name}</h3>
        <hr />
        <FullCalendar
          {...FULLCALENDAR_CONFIG}
          initialEvents={handleFetchEvents}
          events={events}
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
