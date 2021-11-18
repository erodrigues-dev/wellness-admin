import RRule, { rrulestr } from 'rrule';

import {
  frequencyData,
  positionsData,
  weekDaysData,
  monthsData,
} from './consts';

export function makeStateFromRRuleString(value) {
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

    if (options.count) {
      state.repeatEnd = {
        radio: 'after',
        count: options.count,
      };
    }

    if (options.until) {
      state.repeatEnd = {
        radio: 'on',
        on: options.until,
      };
    }
  }

  return state;
}

export function makeRRule(data) {
  if (data.repeat?.label === 'Never' || !data.repeat) return null;

  const options = {
    ...getRepeatOnValues(data),
    ...getWeeklyValues(data),
    ...getMonthlyValues(data),
    ...getYearlyValues(data),
    ...getRepeatEndValues(data),
  };

  return new RRule(options);
}

function getRepeatOnValues(data) {
  return {
    freq: data.repeat?.value,
    interval: data.repeatEvery,
  };
}

function getWeeklyValues(data) {
  const values = {};
  if (data.weekly?.days) values.byweekday = data.weekly?.days;
  return values;
}

function getMonthlyValues(data) {
  const values = {};
  if (data.monthly?.weekday?.value)
    values.byweekday = data.monthly?.weekday?.value;
  if (data.monthly?.day) values.bymonthday = data.monthly?.day;
  if (data.monthly?.position?.value)
    values.bysetpos = data.monthly?.position?.value;
  return values;
}

function getYearlyValues(data) {
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
}

function getRepeatEndValues(data) {
  return {
    count: data.repeatEnd?.after,
    until: data.repeatEnd?.on,
  };
}

function deepEqual(valueA, valueB) {
  const compareA = Array.isArray(valueA) ? [...valueA] : [valueA];
  const compareB = Array.isArray(valueB) ? [...valueB] : [valueB];

  if (compareA.length !== compareB.length) return false;

  const strA = compareA.sort().join('');
  const strB = compareB.sort().join('');

  if (strA !== strB) return false;

  return true;
}
