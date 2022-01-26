import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { Scheduler, DayView } from '@progress/kendo-react-scheduler';
import styled from 'styled-components';

import calendarService from '~/services/calendar';

import { CustomHeader } from './components/CustomHeader';
import { SchedulerContext } from './data/Context';
import { settings } from './data/settings';

export function MainScheduler() {
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendars, setSelectedCalendars] = useState([]);
  const contentRef = useRef(null);

  const fetchCalendars = useCallback(async () => {
    try {
      const { data } = await calendarService.index({});
      setCalendars(data);
      setSelectedCalendars(data);
    } catch (error) {
      toast.error('Unable to load calendars');
    }
  }, []);

  useEffect(() => {
    fetchCalendars();
  }, [fetchCalendars]);

  return (
    <Container>
      <h3>Scheduler</h3>
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
            group={{
              resources: ['Calendars'],
              orientation: 'horizontal',
            }}
            resources={[
              {
                name: 'Calendars',
                data: selectedCalendars,
                field: 'calendarId',
                valueField: 'id',
                textField: 'name',
              },
            ]}
            data={[]}
            header={CustomHeader}
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
