import React, { useState, useCallback } from 'react';
import { Card } from 'react-bootstrap';

import { Day } from '@progress/kendo-date-math';
import { TimePicker } from '@progress/kendo-react-dateinputs';
import {
  Scheduler,
  WeekView,
  MonthView,
  SchedulerSlot,
  SchedulerForm,
  SchedulerFormEditor,
  DayView,
} from '@progress/kendo-react-scheduler';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import Modal from '~/components/Modal';
import api from '~/services/api';

function CustomSlot(props) {
  const colors = Object.freeze({
    enabled: '#fafafa',
    disabled: '#d6d6d6',
    selected: '#b0b0b0',
  });

  function getColor() {
    const day = props.start.getDay();
    const isSunday = day === Day.Sunday;
    const isSaturday = day === Day.Saturday;
    const isWorkSlot =
      props.isWorkDay && props.isWorkHour && !isSunday && !isSaturday;

    if (props.selected) return colors.selected;
    if (isWorkSlot) return colors.enabled;

    return colors.disabled;
  }

  if (props.isAllDay) return null;

  return (
    <SchedulerSlot
      {...props}
      style={{
        ...props.style,
        backgroundColor: getColor(),
      }}
    />
  );
}

function CustomForm(formProps) {
  console.log(formProps);

  function CustomDialog(dialogProps) {
    console.log(dialogProps);
    return (
      <Modal setClose={dialogProps.onClose} title="Meu Modal">
        <div className="p-4">{dialogProps.children[0]}</div>
      </Modal>
    );
  }

  const titleRef = React.createRef(null);

  function FormContent(p) {
    console.log('> FormContent', p);
    return (
      <form onSubmit={formProps.onSubmit}>
        <p>Meu Form</p>

        <input name="title" type="text" />
        <br />
        <button type="submit">Save</button>
      </form>
    );
  }

  function Dummy() {
    return <div />;
  }

  function FormContent2(props) {
    return (
      <SchedulerFormEditor
        {...props}
        allDayEditor={Dummy}
        allDayLabel={Dummy}
        startTimezoneCheckedEditor={Dummy}
        startTimezoneCheckedLabel={Dummy}
        startEditor={TimePicker}
        endEditor={TimePicker}
      />
    );
  }

  return <SchedulerForm {...formProps} editor={FormContent2} />;
}

export function CalendarAvailability() {
  const [data, setData] = useState([]);

  function updateData({ created, updated, deleted }) {
    setData((state) =>
      state
        .map((e) => updated.find((u) => u.id === e.id) || e)
        .filter((e) => !deleted.some((d) => d.id === e.id))
        .concat(created)
    );
  }

  async function sendToApi({ created, updated, deleted }) {
    const mapToApi = (item) => ({
      id: item.id,
      start: item.start,
      end: item.end,
      recurrenceRule: item.recurrenceRule,
      recurrenceExceptions: item.recurrenceExceptions,
      status: 'available',
    });

    const response = await api.post('/calendars/7/slots', {
      created: created.map(mapToApi),
      updated: updated.map(mapToApi),
      deleted: deleted.map(mapToApi),
    });
    console.log(response);
  }

  const handleDataChange = useCallback((changes) => {
    // console.log(changes);
    const params = {
      ...changes,
      created: changes.created.map((item) => ({ ...item, id: uuid() })),
    };

    sendToApi(params);
    updateData(params);
  }, []);

  return (
    <Card body>
      <Card.Title>Calendar availability</Card.Title>

      <Content>
        <Scheduler
          data={data}
          onDataChange={handleDataChange}
          editable
          height={700}
          form={CustomForm}
          defaultView="week"
        >
          <DayView
            slot={CustomSlot}
            startTime="01:00"
            endTime="23:00"
            workDayStart="07:00"
            workDayEnd="19:00"
            slotDivisions={4}
            slotDuration={60}
          />
          <WeekView
            startTime="01:00"
            endTime="23:00"
            workDayStart="07:00"
            workDayEnd="19:00"
            slotDivisions={4}
            slotDuration={60}
            workWeekStart={Day.Monday}
            workWeekEnd={Day.Friday}
            slot={CustomSlot}
          />
          <MonthView />
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
