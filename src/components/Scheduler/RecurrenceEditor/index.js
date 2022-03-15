import React, { useCallback, useEffect, useState } from 'react';

import RRule from 'rrule';

import {
  RepeatSelector,
  RepeatEvery,
  WeeklyRepeatOn,
  MonthlyRepeatOn,
  YearlyRepeatOn,
  RepeatEnd,
} from './editors';
import { makeStateFromRRuleString, makeRRule } from './rrule-parser';
import { Container } from './styles';

export function RecurrenceEditor({ value: externalValue, onChange, styles }) {
  const [data, setData] = useState(makeStateFromRRuleString(externalValue));

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
    const rrule = makeRRule(data);
    const rulestr = rrule?.toString();

    if (externalValue !== rulestr) {
      onChange({ value: rulestr });
    }
  }, [data, externalValue, onChange]);

  return (
    <Container style={styles}>
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
    </Container>
  );
}
