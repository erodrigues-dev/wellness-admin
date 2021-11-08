/* eslint-disable jsx-a11y/role-has-required-aria-props */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useCallback, useEffect, useState } from 'react';

import { Button, ButtonGroup } from '@progress/kendo-react-buttons';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { FieldWrapper } from '@progress/kendo-react-form';
import { NumericTextBox, RadioButton } from '@progress/kendo-react-inputs';
import { Label } from '@progress/kendo-react-labels';
import RRule, { rrulestr } from 'rrule';

import {
  frequencyData,
  daysData,
  monthsData,
  positionsData,
  weekDaysData,
} from './consts';

function RepeatSelector({ value, onChange }) {
  return (
    <FieldWrapper>
      <Label>Repeat</Label>
      <ButtonGroup width="100%">
        {frequencyData.map((item) => (
          <Button
            type="button"
            key={item.label}
            selected={item.value === (value ?? null)}
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

function RepeatEvery({ value, onChange }) {
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

function WeeklyRepeatOn({ value, onChange }) {
  const [data, setData] = useState(value?.days || []);

  function handleChangeRepeatOn(day) {
    const include = data.includes(day);
    const selecteds = include ? data.filter((x) => x !== day) : [...data, day];
    setData(selecteds);
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
            selected={data.includes(item.value)}
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

function MonthlyRepeatOn({ value, onChange }) {
  const [data, setData] = useState(
    value || {
      radio: 'day',
      day: null,
      position: null,
      weekday: null,
    }
  );

  const handleChangeRadio = ({ value: radio }) => {
    setData((state) => ({
      ...state,
      radio,
      position: null,
      weekday: null,
      day: null,
    }));
  };

  const handleChangeDay = ({ value: day }) => {
    setData((state) => ({ ...state, day: Number(day) }));
  };

  const handleChangePosition = ({ value: position }) => {
    setData((state) => ({ ...state, position }));
  };

  const handleChangeWeekday = ({ value: weekday }) => {
    setData((state) => ({ ...state, weekday }));
  };

  useEffect(() => {
    if (data !== value) onChange(data);
  }, [onChange, value, data]);

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

function YearlyRepeatOn({ value: externalValue, onChange }) {
  const [data, setData] = useState(
    externalValue || {
      radio: 'month',
    }
  );

  const handleChangeRadio = ({ value }) => {
    setData({
      radio: value,
    });
  };

  const handleChangeDay = ({ value }) => {
    setData((state) => ({
      ...state,
      month: {
        ...state.month,
        day: Number(value),
      },
    }));
  };

  const handleChangeMonth = ({ value }) => {
    setData((state) => ({
      ...state,
      month: {
        ...state.month,
        value,
      },
    }));
  };

  const handleChangePosition = ({ value }) => {
    setData((state) => ({
      ...state,
      position: {
        ...state.position,
        value,
      },
    }));
  };

  const handleChangeWeekday = ({ value }) => {
    setData((state) => ({
      ...state,
      position: {
        ...state.position,
        weekday: value,
      },
    }));
  };

  const handleChangePositionMonth = ({ value }) => {
    setData((state) => ({
      ...state,
      position: {
        ...state.position,
        month: value,
      },
    }));
  };

  useEffect(() => {
    if (data !== externalValue) onChange(data);
  }, [onChange, externalValue, data]);

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

function RepeatEnd() {
  const [data, setData] = useState({ radio: 'never' });

  const handleChangeRadio = ({ value }) => {
    setData({ radio: value, after: null, on: null });
  };

  const handleChangeAfter = ({ value }) => {
    setData((state) => ({ ...state, after: value }));
  };

  const handleChangeOn = ({ value }) => {
    setData((state) => ({ ...state, on: value }));
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
            checked={data.radio === 'never'}
            value="never"
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
            checked={data.radio === 'after'}
            value="after"
            label="After"
            onChange={handleChangeRadio}
          />
          <NumericTextBox
            min={1}
            width={160}
            value={data.after}
            onChange={handleChangeAfter}
            disabled={data.radio !== 'after'}
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
            checked={data.radio === 'on'}
            value="on"
            label="On"
            onChange={handleChangeRadio}
          />
          <DatePicker
            width={240}
            value={data.on}
            onChange={handleChangeOn}
            disabled={data.radio !== 'on'}
          />
        </li>
      </ul>
    </FieldWrapper>
  );
}

export function RecurrenceEditor({ value: externalValue, onChange }) {
  const [data, setData] = useState({
    repeat: {
      label: 'Never',
      value: null,
    },
  });

  function handleChangeRepeat({ label, value }) {
    const isNever = label === 'Never';
    setData({
      repeat: { label, value },
      repeatEvery: isNever ? undefined : 1,
    });
  }

  const handleChange = useCallback((name, value) => {
    setData((state) => ({ ...state, [name]: value }));
  }, []);

  useEffect(() => {
    console.log(data);

    if (data.repeat?.label !== 'Never') {
      const rule = new RRule({
        freq: data.repeat?.value,
        interval: data.repeatEvery,
        byweekday:
          data.weekly?.days ||
          data.monthly?.weekday?.value ||
          data.yearly?.position?.weekday?.value,
        bymonthday: data.monthly?.day || data.yearly?.month?.day,
        bysetpos:
          data.monthly?.position?.value || data.yearly?.position?.value?.value,
        bymonth:
          data.yearly?.month?.value?.value ||
          data.yearly?.position?.month?.value,
      });
      const rulestr = rule.toString();
      console.log(rulestr);
      if (externalValue !== rulestr) {
        console.log('call on change');
        onChange({ value: rulestr });
      }
    }

    // if (data !== externalValue) {
    //   onChange({
    //     value:
    //       'DTSTART:20211108T185300ZRRULE:FREQ=WEEKLY;COUNT=30;INTERVAL=1;WKST=MO',
    //   });
    // }
  }, [data, externalValue, onChange]);

  return (
    <div>
      <RepeatSelector
        value={data.repeat?.value}
        onChange={handleChangeRepeat}
      />
      {data.repeat?.label !== 'Never' && (
        <>
          <RepeatEvery
            value={data.repeatEvery}
            onChange={({ value }) => handleChange('repeatEvery', Number(value))}
          />
          {data.repeat.value === RRule.WEEKLY && (
            <WeeklyRepeatOn
              value={data.weekly}
              onChange={(value) => handleChange('weekly', value)}
            />
          )}
          {data.repeat.value === RRule.MONTHLY && (
            <MonthlyRepeatOn
              value={data.monthly}
              onChange={(value) => handleChange('monthly', value)}
            />
          )}
          {data.repeat.value === RRule.YEARLY && (
            <YearlyRepeatOn
              value={data.yearly}
              onChange={(value) => handleChange('yearly', value)}
            />
          )}
          <RepeatEnd />
        </>
      )}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}
