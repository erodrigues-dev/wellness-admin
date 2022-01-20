import React, { useContext } from 'react';

import { ToolbarItem } from '@progress/kendo-react-buttons';
import { SchedulerHeader } from '@progress/kendo-react-scheduler';

import { CalendarSelect } from './CalendarSelect';
import { MainSchedulerContext } from './Context';

export function CustomHeader({ children }) {
  const [Seletor, Datepicker, ...Others] = children;
  const { calendars, selectedCalendars, setSelectedCalendars } =
    useContext(MainSchedulerContext);

  return (
    <SchedulerHeader>
      {Seletor}
      {Datepicker}
      <ToolbarItem>
        <CalendarSelect
          calendars={calendars}
          selecteds={selectedCalendars}
          onChange={setSelectedCalendars}
        />
      </ToolbarItem>
      {Others}
    </SchedulerHeader>
  );
}
