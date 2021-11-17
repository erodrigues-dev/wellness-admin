/* eslint-disable prefer-destructuring */
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

function deepEqual(valueA, valueB) {
  const compareA = Array.isArray(valueA) ? [...valueA] : [valueA];
  const compareB = Array.isArray(valueB) ? [...valueB] : [valueB];

  if (compareA.length !== compareB.length) return false;

  const strA = compareA.sort().join('');
  const strB = compareB.sort().join('');

  if (strA !== strB) return false;

  return true;
}

function RepeatSelector({ value: selected, onChange }) {
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

function WeeklyRepeatOn({ value: data = { days: [] }, onChange }) {
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

function MonthlyRepeatOn({
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

function YearlyRepeatOn({
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

function RepeatEnd({ value = { radio: 'never' }, onChange }) {
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

export function RecurrenceEditor({ value: externalValue, onChange }) {
  const [data, setData] = useState(makeDataFromExternalValue(externalValue));

  function makeDataFromExternalValue(value) {
    const state = {
      repeat: {
        label: 'Never',
        value: null,
      },
    };

    if (value) {
      const { origOptions: options } = rrulestr(value);

      if (Number.isInteger(options.freq)) {
        state.repeat = frequencyData.find((x) => x.value === options.freq);
        state.repeatEvery = 1;
      }

      if (options.freq === RRule.WEEKLY) {
        state.weekly = {
          days: options.byweekday,
        };
      }

      if (options.freq === RRule.MONTHLY) {
        state.monthly = {
          radio: options.bymonthday ? 'day' : 'position',
          weekday: weekDaysData.find((week) =>
            deepEqual(week.value, options.byweekday)
          ),
          day: options.bymonthday,
          position: positionsData.find(
            ({ value: position }) => position === options.bysetpos
          ),
        };
      }

      if (options.freq === RRule.YEARLY) {
        state.yearly = {
          radio: options.bymonthday ? 'month' : 'position',
          month: {
            value: monthsData.find((month) => month.value === options.bymonth),
            day: options.bymonthday,
          },
          position: {
            value: positionsData.find(
              (position) => position.value === options.bysetpos
            ),
            weekday: weekDaysData.find((week) =>
              deepEqual(week.value, options.byweekday)
            ),
            month: monthsData.find((month) => month.value === options.bymonth),
          },
        };
      }
    }

    return state;
  }

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

  const getRepeatOnValues = useCallback(() => {
    return {
      freq: data.repeat?.value,
      interval: data.repeatEvery,
    };
  }, [data.repeat, data.repeatEvery]);

  const getWeeklyValues = useCallback(() => {
    const values = {};
    if (data.weekly?.days) values.byweekday = data.weekly?.days;
    return values;
  }, [data.weekly]);

  const getMonthlyValues = useCallback(() => {
    const values = {};
    if (data.monthly?.weekday?.value)
      values.byweekday = data.monthly?.weekday?.value;
    if (data.monthly?.day) values.bymonthday = data.monthly?.day;
    if (data.monthly?.position?.value)
      values.bysetpos = data.monthly?.position?.value;
    return values;
  }, [data.monthly]);

  const getYearlyValues = useCallback(() => {
    const values = {};
    if (data.yearly?.position?.weekday?.value)
      values.byweekday = data.yearly?.position?.weekday?.value;
    if (data.yearly?.position?.value?.value)
      values.bysetpos = data.yearly?.position?.value?.value;
    if (data.yearly?.month?.value?.value)
      values.bymonth = data.yearly?.month?.value?.value;
    if (data.yearly?.position?.month?.value)
      values.bymonth = data.yearly?.position?.month?.value;
    return values;
  }, [data.yearly]);

  const getRepeatEndValues = useCallback(() => {
    return {
      count: data.repeatEnd?.after,
      until: data.repeatEnd?.on,
    };
  }, [data.repeatEnd]);

  const makeRRule = useCallback(() => {
    if (data.repeat?.label === 'Never' || !data.repeat) return null;

    const options = {
      ...getRepeatOnValues(),
      ...getWeeklyValues(),
      ...getMonthlyValues(),
      ...getYearlyValues(),
      ...getRepeatEndValues(),
    };

    return new RRule(options);
  }, [
    data.repeat,
    getRepeatOnValues,
    getWeeklyValues,
    getMonthlyValues,
    getYearlyValues,
    getRepeatEndValues,
  ]);

  useEffect(() => {
    const rrule = makeRRule();
    const rulestr = rrule?.toString();

    if (externalValue !== rulestr) {
      onChange({ value: rulestr });
    }
  }, [makeRRule, externalValue, onChange]);

  return (
    <div>
      <RepeatSelector value={data.repeat} onChange={handleChangeRepeat} />
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
          <RepeatEnd
            value={data.repeatEnd}
            onChange={(value) => handleChange('repeatEnd', value)}
          />
        </>
      )}
    </div>
  );
}
