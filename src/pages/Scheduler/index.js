import React, { useCallback, useRef } from 'react';

import { Scheduler, DayView } from '@progress/kendo-react-scheduler';
import styled from 'styled-components';

import { AppointmentFormModal } from './components/AppointmentFormModal';
import { CustomHeader } from './components/CustomHeader';
import { CustomItem } from './components/CustomItem';
import { CustomSlot } from './components/CustomSlot';
import { useSchedulerContext, SchedulerProvider } from './data/Context';

export function SchedulerPage() {
  return (
    <SchedulerProvider>
      <CalendarScheduler />
    </SchedulerProvider>
  );
}

export function CalendarScheduler() {
  const {
    calendars,
    selectedCalendars,
    entries,
    selectedDate,
    setSelectedDate,
    settings,
    modal,
  } = useSchedulerContext();

  const contentRef = useRef(null);

  const handleDateChange = useCallback(
    ({ value }) => {
      setSelectedDate(new Date(value));
    },
    [setSelectedDate]
  );

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
          <Scheduler
            height={contentRef.current?.clientHeight - 20 || 600}
            group={settings.group}
            resources={[{ ...settings.resources, data: selectedCalendars }]}
            data={entries}
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
          </Scheduler>
          <AppointmentFormModal />
        </Content>
      )}
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;

  .k-scheduler {
    width: ${(props) => props.contentWidth}px;
  }

  .k-scheduler-toolbar span.k-datepicker {
    width: auto;
  }

  // set fixed times column on scroll horizontal
  .k-scheduler .k-scheduler-day-view .k-side-cell {
    position: sticky;
    left: 0;
    z-index: 2;
    background: #fff;
  }

  // set min width for columns
  .k-scheduler-head,
  .k-scheduler-body {
    min-width: ${(props) => props.schedulerWidth}px;
  }

  // hide allday slot and date slot
  .k-scheduler-head
    .k-scheduler-group:nth-child(1)
    .k-scheduler-row:nth-child(2),
  .k-scheduler-head .k-scheduler-group:nth-child(2) {
    display: none;
  }
`;
