import React from 'react';

import { ToolbarItem, ToolbarSpacer } from '@progress/kendo-react-buttons';
import { SchedulerHeader } from '@progress/kendo-react-scheduler';

import { useSchedulerContext } from '../../data/SchedulerContext';
import { CalendarSelect } from './CalendarSelect';
import { CustomButtons } from './CustomButtons';

export function CustomHeader({ children }) {
  const [Seletor, Datepicker] = children;
  const { calendars, selectedCalendars, setSelectedCalendars } =
    useSchedulerContext();

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
      <ToolbarSpacer />
      <CustomButtons />
    </SchedulerHeader>
  );
}
