import React from 'react';
import { Card } from 'react-bootstrap';

import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
} from '@progress/kendo-react-scheduler';

export function CalendarAvailability() {
  return (
    <Card body>
      <Card.Title>Calendar availability</Card.Title>

      <Scheduler defaultView="week">
        <DayView />
        <WeekView />
        <MonthView />
      </Scheduler>
    </Card>
  );
}
