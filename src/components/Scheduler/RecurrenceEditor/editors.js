/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/role-has-required-aria-props */
/* eslint-disable prefer-destructuring */
import React from 'react';

import { Button, ButtonGroup } from '@progress/kendo-react-buttons';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { FieldWrapper } from '@progress/kendo-react-form';
import { NumericTextBox, RadioButton } from '@progress/kendo-react-inputs';
import { Label } from '@progress/kendo-react-labels';

import {
  frequencyData,
  daysData,
  monthsData,
  positionsData,
  weekDaysData,
} from './consts';

export function RepeatSelector({ value: selected, onChange }) {
  return (
    <FieldWrapper>
      <Label>Repeat</Label>
      <ButtonGroup width="100%">
        {frequencyData.map((item) => (
          <Button
            type="button"
            key={item.label}
            selected={item.value === selected?.value ?? null}
            onClick={() => onChange(item)}
            togglable
          >
            {item.label}
          </Button>
        ))}
      </ButtonGroup>
    </FieldWrapper>
  );
}

export function RepeatEvery({ value, onChange }) {
  return (
    <FieldWrapper>
      <NumericTextBox
        label="Repeat every"
        type="number"
        value={value}
        min={1}
        step={1}
        onChange={onChange}
      />
    </FieldWrapper>
  );
}

export function WeeklyRepeatOn({ value: data = { days: [] }, onChange }) {
  function handleChangeRepeatOn(day) {
    const { days } = data;
    const included = days.includes(day);
    const selecteds = included ? days.filter((x) => x !== day) : [...days, day];
    onChange({ days: selecteds });
  }

  return (
    <FieldWrapper>
      <Label>Repeat on</Label>
      <ButtonGroup width="100%">
        {daysData.map((item) => (
          <Button
            type="button"
            key={item.value}
            selected={data.days.includes(item.value)}
            onClick={() => handleChangeRepeatOn(item.value)}
            togglable
          >
            {item.label}
          </Button>
        ))}
      </ButtonGroup>
    </FieldWrapper>
  );
}

export function MonthlyRepeatOn({
  value: data = {
    radio: 'day',
    day: 1,
  },
  onChange,
}) {
  const handleChangeRadio = ({ value: radio }) => {
    const values = { radio };

    if (radio === 'day') values.day = 1;
    if (radio === 'position') {
      values.position = positionsData[0];
      values.weekday = weekDaysData[0];
    }

    onChange(values);
  };

  const handleChangeDay = ({ value: day }) => {
    onChange({ ...data, day: Number(day) });
  };

  const handleChangePosition = ({ value: position }) => {
    onChange({ ...data, position });
  };

  const handleChangeWeekday = ({ value: weekday }) => {
    onChange({ ...data, weekday });
  };

  return (
    <FieldWrapper>
      <Label>Repeat on</Label>
      <ul role="radiogroup" className="k-radio-list k-list-vertical k-reset">
        <li
          role="radio"
          className="k-radio-item"
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <RadioButton
            name="monthly-repeat-on"
            label="Day"
            checked={data.radio === 'day'}
            value="day"
            onChange={handleChangeRadio}
          />
          <NumericTextBox
            min={1}
            max={31}
            width={160}
            value={data.day}
            onChange={handleChangeDay}
            disabled={data.radio !== 'day'}
          />
        </li>
        <li
          role="radio"
          className="k-radio-item"
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <RadioButton
            name="monthly-repeat-on"
            checked={data.radio === 'position'}
            value="position"
            onChange={handleChangeRadio}
          />
          <DropDownList
            data={positionsData}
            style={{ width: 'auto', minWidth: '160px' }}
            disabled={data.radio !== 'position'}
            value={data.position}
            onChange={handleChangePosition}
            dataItemKey="value"
            textField="label"
          />
          <DropDownList
            data={weekDaysData}
            style={{ width: 'auto', minWidth: '160px' }}
            disabled={data.radio !== 'position'}
            value={data.weekday}
            onChange={handleChangeWeekday}
            dataItemKey="value"
            textField="label"
          />
        </li>
      </ul>
    </FieldWrapper>
  );
}

export function YearlyRepeatOn({
  value: data = {
    radio: 'month',
    month: {
      value: monthsData[0],
      day: 1,
    },
  },
  onChange,
}) {
  const handleChangeRadio = ({ value: radio }) => {
    const values = { radio };

    if (radio === 'month') {
      values.month = {
        value: monthsData[0],
        day: 1,
      };
    }

    if (radio === 'position') {
      values.position = {
        value: positionsData[0],
        weekday: weekDaysData[0],
        month: monthsData[0],
      };
    }

    onChange(values);
  };

  const handleChangeDay = ({ value }) => {
    onChange({
      ...data,
      month: {
        ...data.month,
        day: Number(value),
      },
    });
  };

  const handleChangeMonth = ({ value }) => {
    onChange({
      ...data,
      month: {
        ...data.month,
        value,
      },
    });
  };

  const handleChangePosition = ({ value }) => {
    onChange({
      ...data,
      position: {
        ...data.position,
        value,
      },
    });
  };

  const handleChangeWeekday = ({ value }) => {
    onChange({
      ...data,
      position: {
        ...data.position,
        weekday: value,
      },
    });
  };

  const handleChangePositionMonth = ({ value }) => {
    onChange({
      ...data,
      position: {
        ...data.position,
        month: value,
      },
    });
  };

  return (
    <FieldWrapper>
      <Label>Repeat on</Label>
      <ul role="radiogroup" className="k-radio-list k-list-vertical k-reset">
        <li
          role="radio"
          className="k-radio-item"
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <RadioButton
            name="yearly-repeat-on"
            label=""
            checked={data.radio === 'month'}
            value="month"
            onChange={handleChangeRadio}
          />
          <DropDownList
            data={monthsData}
            value={data.month?.value || null}
            onChange={handleChangeMonth}
            style={{ width: 'auto', minWidth: '160px' }}
            disabled={data.radio !== 'month'}
            dataItemKey="value"
            textField="label"
          />
          <NumericTextBox
            min={1}
            max={31}
            width={160}
            value={data.month?.day || null}
            onChange={handleChangeDay}
            disabled={data.radio !== 'month'}
          />
        </li>
        <li
          role="radio"
          className="k-radio-item"
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <RadioButton
            name="yearly-repeat-on"
            checked={data.radio === 'position'}
            value="position"
            onChange={handleChangeRadio}
          />
          <DropDownList
            data={positionsData}
            style={{ width: 'auto', minWidth: '160px' }}
            disabled={data.radio !== 'position'}
            value={data.position?.value || null}
            onChange={handleChangePosition}
            dataItemKey="value"
            textField="label"
          />
          <DropDownList
            data={weekDaysData}
            style={{ width: 'auto', minWidth: '160px' }}
            disabled={data.radio !== 'position'}
            value={data.position?.weekday || null}
            onChange={handleChangeWeekday}
            dataItemKey="value"
            textField="label"
          />
          <span>of</span>
          <DropDownList
            data={monthsData}
            style={{ width: 'auto', minWidth: '160px' }}
            disabled={data.radio !== 'position'}
            value={data.position?.month || null}
            onChange={handleChangePositionMonth}
            dataItemKey="value"
            textField="label"
          />
        </li>
      </ul>
    </FieldWrapper>
  );
}

export function RepeatEnd({ value = { radio: 'never' }, onChange }) {
  const handleChangeRadio = ({ value: radio }) => {
    onChange({
      radio,
      count: radio === 'after' ? 1 : null,
      on: radio === 'on' ? new Date() : null,
    });
  };

  const handleChangeAfter = ({ value: after }) => {
    onChange({ ...value, after });
  };

  const handleChangeOn = ({ value: on }) => {
    onChange({ ...value, on });
  };

  return (
    <FieldWrapper>
      <Label>End</Label>
      <ul role="radiogroup" className="k-radio-list k-list-vertical k-reset">
        <li
          role="radio"
          className="k-radio-item"
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <RadioButton
            name="radio-repeat-end"
            label="Never"
            value="never"
            checked={value.radio === 'never'}
            onChange={handleChangeRadio}
          />
        </li>
        <li
          role="radio"
          className="k-radio-item"
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <RadioButton
            name="radio-repeat-end"
            label="After"
            value="after"
            checked={value.radio === 'after'}
            onChange={handleChangeRadio}
          />
          <NumericTextBox
            min={1}
            width={160}
            value={value.count}
            onChange={handleChangeAfter}
            disabled={value.radio !== 'after'}
          />
          <span>occurrence(s)</span>
        </li>
        <li
          role="radio"
          className="k-radio-item"
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <RadioButton
            name="radio-repeat-end"
            label="On"
            value="on"
            checked={value.radio === 'on'}
            onChange={handleChangeRadio}
          />
          <DatePicker
            width={240}
            value={value.on}
            onChange={handleChangeOn}
            disabled={value.radio !== 'on'}
          />
        </li>
      </ul>
    </FieldWrapper>
  );
}
