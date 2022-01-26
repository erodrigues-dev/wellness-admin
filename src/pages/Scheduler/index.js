import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { Scheduler, DayView } from '@progress/kendo-react-scheduler';
import styled from 'styled-components';

import { clearTime } from '~/helpers/date';
import calendarService from '~/services/calendar';
import * as calendarEntryService from '~/services/calendar-entry';

import { CustomHeader } from './components/CustomHeader';
import { SchedulerContext } from './data/Context';
import { settings } from './data/settings';

export function MainScheduler() {
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendars, setSelectedCalendars] = useState([]);
  const [selectedDate, setSelectedDate] = useState(clearTime(new Date()));

  const [entries, setEntries] = useState([]);

  const contentRef = useRef(null);

  const mapToDataItem = (data) => {
    const title = `${data.customer.name} (${data.activity.name})`;
    const start = new Date(data.dateStart);
    const end = new Date(data.dateEnd);

    return {
      id: data.id,
      title,
      start,
      end,
      calendarId: data.calendarId,
    };
  };

  const fetchCalendars = useCallback(async () => {
    try {
      const { data } = await calendarService.index();
      if (data.length === 0) toast.error('Not exist calendars');
      setCalendars(data);
      setSelectedCalendars(data);
    } catch (error) {
      toast.error('Unable to load calendars');
    }
  }, []);

  const fetchEntries = useCallback(async () => {
    try {
      if (selectedCalendars.length > 0 && selectedDate) {
        const data = await calendarEntryService.list({
          calendars: selectedCalendars.map((item) => item.id),
          date: selectedDate,
        });
        setEntries(data.map(mapToDataItem));
      }
    } catch (error) {
      toast.error('Unable to list scheduler data');
    }
  }, [selectedCalendars, selectedDate]);

  const handleDateChange = useCallback(({ value }) => {
    setSelectedDate(new Date(value));
  }, []);

  useEffect(() => {
    fetchCalendars();
  }, [fetchCalendars]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

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
        <SchedulerContext.Provider
          value={{
            calendars,
            selectedCalendars,
            setSelectedCalendars,
          }}
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
        </SchedulerContext.Provider>
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
