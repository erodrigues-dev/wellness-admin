import React, { useCallback, useMemo, useRef } from 'react';

import {
  Scheduler as KendoScheduler,
  DayView,
} from '@progress/kendo-react-scheduler';

import { AppointmentFormModal } from './components/AppointmentFormModal';
import { CustomHeader } from './components/CustomHeader';
import { CustomItem } from './components/CustomItem';
import { CustomSlot } from './components/CustomSlot';
import { AppointmentProvider } from './data/AppointmentContext';
import {
  useSchedulerContext,
  SchedulerProvider,
} from './data/SchedulerContext';
import { Container, Content } from './styles';

export function Scheduler() {
  return (
    <SchedulerProvider>
      <AppointmentProvider>
        <InnerScheduler />
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
    const { appointments } = items;

    return [...appointments];
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
          <AppointmentFormModal />
        </Content>
      )}
    </Container>
  );
}
