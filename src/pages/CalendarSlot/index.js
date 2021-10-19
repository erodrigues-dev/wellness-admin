import React, { useState, useCallback, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Scheduler, DayView, WeekView } from '@progress/kendo-react-scheduler';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import service from '~/services/calendar-slot';

import { CustomSlot, CustomViewItem } from './custom-scheduler';

const settings = {
  startTime: '01:00',
  endTime: '23:00',
  workDayStart: '07:00',
  workDayEnd: '19:00',
  slotDivisions: 4,
  slotDuration: 60,
};

export function CalendarSlot() {
  const [events, setEvents] = useState([]);
  const { id: calendarId } = useParams();

  const updateData = useCallback(({ created, updated, deleted }) => {
    setEvents((state) =>
      state
        .map((e) => updated.find((u) => u.id === e.id) || e)
        .filter((e) => !deleted.some((d) => d.id === e.id))
        .concat(created)
    );
  }, []);

  const sendToApi = useCallback(
    async (data) => {
      try {
        await service.store({ calendarId, ...data });
      } catch (error) {
        toast.error(error.message);
      }
    },
    [calendarId]
  );

  const listEvents = useCallback(async () => {
    try {
      const data = await service.list({ calendarId });
      setEvents(data);
    } catch (error) {
      toast.error(error.message);
    }
  }, [calendarId]);

  const handleDataChange = useCallback(
    (changes) => {
      const data = fillCreatedsWithNewId(changes);

      sendToApi(data);
      updateData(data);
    },
    [sendToApi, updateData]
  );

  function fillCreatedsWithNewId(changes) {
    return {
      ...changes,
      created: changes.created.map((item) => ({ ...item, id: uuid() })),
    };
  }

  useEffect(() => {
    listEvents();
  }, [listEvents]);

  return (
    <Card body>
      <Card.Title>Calendar availability</Card.Title>

      <Content>
        <Scheduler
          data={events}
          onDataChange={handleDataChange}
          defaultView="week"
          height={700}
          editable
        >
          <DayView
            slot={CustomSlot}
            startTime={settings.startTime}
            endTime={settings.endTime}
            workDayStart={settings.workDayStart}
            workDayEnd={settings.workDayEnd}
            slotDivisions={settings.slotDivisions}
            slotDuration={settings.slotDuration}
          />
          <WeekView
            startTime={settings.startTime}
            endTime={settings.endTime}
            workDayStart={settings.workDayStart}
            workDayEnd={settings.workDayEnd}
            slotDivisions={settings.slotDivisions}
            slotDuration={settings.slotDuration}
            slot={CustomSlot}
            viewItem={CustomViewItem}
          />
        </Scheduler>
      </Content>
    </Card>
  );
}

const Content = styled.div`
  .k-scheduler-day-view .k-scheduler-head .k-scheduler-group:nth-child(2) {
    display: none;
  }
`;
