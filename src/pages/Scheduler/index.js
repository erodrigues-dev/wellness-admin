import React, { useCallback, useMemo, useRef } from 'react';

import {
  Scheduler as KendoScheduler,
  DayView,
} from '@progress/kendo-react-scheduler';

import { AppointmentModals } from './components/appointments/AppointmentModals';
import { BlockModals } from './components/blocks/BlockModals';
import { ClassModals } from './components/classes/ClassModals';
import { CustomHeader } from './components/SchedulerItems/CustomHeader';
import { CustomItem } from './components/SchedulerItems/CustomItem';
import { CustomSlot } from './components/SchedulerItems/CustomSlot';
import { AppointmentProvider } from './data/AppointmentContext';
import { BlockProvider } from './data/BlockContext';
import { ClassProvider } from './data/ClassContext';
import {
  useSchedulerContext,
  SchedulerProvider,
} from './data/SchedulerContext';
import { Container, Content } from './styles';

export function Scheduler() {
  return (
    <SchedulerProvider>
      <AppointmentProvider>
        <ClassProvider>
          <BlockProvider>
            <InnerScheduler />
          </BlockProvider>
        </ClassProvider>
      </AppointmentProvider>
    </SchedulerProvider>
  );
}

function InnerScheduler() {
  const {
    calendars,
    selectedCalendars,
    selectedDate,
    setSelectedDate,
    settings,
    items,
  } = useSchedulerContext();

  const contentRef = useRef(null);

  const handleDateChange = useCallback(
    ({ value }) => {
      setSelectedDate(new Date(value));
    },
    [setSelectedDate]
  );

  const handleSchedulerData = useMemo(() => {
    // Later here we also will put the classes and blocks
    const { appointments, classes } = items;

    return [...appointments, ...classes];
  }, [items]);

  return (
    <Container>
      <h3>Scheduler</h3>
      {calendars.length === 0 && <p>No calendars found.</p>}
      {calendars.length > 0 && (
        <Content
          ref={contentRef}
          contentWidth={contentRef.current?.clientWidth}
          schedulerWidth={selectedCalendars.length * settings.calendarMinWidth}
        >
          <KendoScheduler
            height={contentRef.current?.clientHeight - 20 || 600}
            group={settings.group}
            resources={[{ ...settings.resources, data: selectedCalendars }]}
            data={handleSchedulerData}
            header={CustomHeader}
            onDateChange={handleDateChange}
            date={selectedDate}
            item={CustomItem}
            slot={CustomSlot}
            editable={{
              remove: true,
            }}
          >
            <DayView
              startTime={settings.startTime}
              endTime={settings.endTime}
              workDayStart={settings.workDayStart}
              workDayEnd={settings.workDayEnd}
              slotDivisions={settings.slotDivisions}
              slotDuration={settings.slotDuration}
            />
          </KendoScheduler>
          <AppointmentModals />
          <ClassModals />
          <BlockModals />
        </Content>
      )}
    </Container>
  );
}
