/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/role-has-required-aria-props */
import React, { useState } from 'react';

import { Day } from '@progress/kendo-date-math';
import { Button, ButtonGroup } from '@progress/kendo-react-buttons';
import { TimePicker } from '@progress/kendo-react-dateinputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { FormElement, Field } from '@progress/kendo-react-form';
import { Input, RadioButton } from '@progress/kendo-react-inputs';
import { Label, Error } from '@progress/kendo-react-labels';
import {
  SchedulerSlot,
  SchedulerFormEditor,
  SchedulerForm,
  SchedulerViewItem,
} from '@progress/kendo-react-scheduler';
import RRule, { Frequency, Weekday } from 'rrule';

import Modal from '~/components/Modal';

export function CustomSlot(props) {
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

export function CustomViewItem(props) {
  const { dataItem } = props;
  const { status } = dataItem;

  const colors = {
    available: '#b0d04c',
    block: '#dc3545',
  };

  return (
    <SchedulerViewItem
      {...props}
      style={{
        backgroundColor: colors[status] || colors.block,
      }}
    />
  );
}

// TODO install and test this lib
// https://www.npmjs.com/package/react-rrule-generator

function RecurrenceEditor(props) {
  const frequencies = [
    { value: null, text: 'Never' },
    { value: Frequency.DAILY, text: 'Daily' },
    { value: Frequency.WEEKLY, text: 'Weekly' },
    { value: Frequency.MONTHLY, text: 'Monthly' },
    { value: Frequency.YEARLY, text: 'Yearly' },
  ];



  const [data, setData] = useState({
    freq: null,
    interval: 1,
    byWeekDay: [],
  });

  const handleChangeFrequency = (freq) => {
    setData((state) => ({
      ...state,
      freq,
    }));
  };

  const handleChangeInterval = (value) => {
    setData((state) => ({
      ...state,
      interval: Number(value),
    }));
  };

  const handleChangeByWeekDay = (value) => {
    const isSelected = data.byWeekDay.includes(value);

    setData((state) => ({
      ...state,
      byWeekDay: isSelected
        ? state.byWeekDay.filter((day) => day !== value)
        : [value, ...state.byWeekDay],
    }));
  };

  return (
    <div>
      <div className="k-form-field">
        <Label>Repeat</Label>
        <ButtonGroup>
          {frequencies.map((freq) => (
            <Button
              selected={data.freq === freq.value}
              onClick={() => handleChangeFrequency(freq.value)}
              togglable
            >
              {freq.text}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      {data.freq && (
        <div>
          <div className="k-form-field">
            <Label>Repeat every</Label>
            <Input
              type="number"
              value={data.interval}
              min={1}
              onChange={(e) => handleChangeInterval(e.target.value)}
            />
          </div>
          {data.freq === Frequency.WEEKLY && (
            <div className="k-form-field">
              <Label>Repeat on</Label>
              <ButtonGroup>
                {Object.keys(Day)
                  .filter((k) => isNaN(k))
                  .map((key) => (
                    <Button
                      key={key}
                      selected={data.byWeekDay.includes(Day[key])}
                      togglable
                      onClick={() => handleChangeByWeekDay(Day[key])}
                    >
                      {key}
                    </Button>
                  ))}
              </ButtonGroup>
            </div>
          )}
          <div className="k-form-field">
            <Label>Repeat on</Label>
            <ul
              role="radiogroup"
              className="k-radio-list k-list-vertical k-reset"
            >
              <li role="radio" className="k-radio-item">
                <RadioButton name="repeat-monthly" label="Day" />
                <Input type="number" />
              </li>
              <li role="radio" className="k-radio-item">
                <RadioButton name="repeat-monthly" />
                <DropDownList data={} />
                <DropDownList data={} />
              </li>
            </ul>
          </div>
        </div>
      )}

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

function CustomEditor() {
  // console.log(props);

  return (
    <FormElement>
      <div className="k-form-field">
        <Label>Status</Label>
        <DropDownList data={['available', 'block']} />
      </div>

      <div className="k-form-field">
        <Field name="recurrenceRule" component={RecurrenceEditor} />
      </div>
    </FormElement>
  );

  // return <SchedulerFormEditor {...props} />;
}

export function CustomForm(props) {
  return <SchedulerForm {...props} editor={CustomEditor} />;
}
