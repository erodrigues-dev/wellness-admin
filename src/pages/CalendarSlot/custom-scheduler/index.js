/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/role-has-required-aria-props */
import React, { useEffect, useState } from 'react';

import { Day } from '@progress/kendo-date-math';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { FormElement, Field } from '@progress/kendo-react-form';
import { Label } from '@progress/kendo-react-labels';
import {
  SchedulerSlot,
  SchedulerForm,
  SchedulerViewItem,
} from '@progress/kendo-react-scheduler';

import { RecurrenceEditor } from '~/components/Scheduler/RecurrenceEditor';

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

function TitleEditor({ value, onChange }) {
  const [data, setData] = useState(value);

  function handleChange({ value: t }) {
    // props.onChange({ value });
    setData(t);
  }

  useEffect(() => {
    console.log('>>>>>');
    if (data !== value) {
      console.log('<<<<<', data);
      onChange({ value: data });
    }
  }, [data, value, onChange]);

  return (
    <DropDownList
      data={['Item 1', 'Item 2']}
      value={data}
      onChange={handleChange}
      label="Meu titulo"
    />
  );
}

function CustomEditor(props) {
  // console.log(props);

  return (
    <FormElement>
      <div className="k-form-field">
        <Field name="title" component={TitleEditor} />
      </div>

      <div className="k-form-field">
        <Label>Status</Label>
        <DropDownList data={['available', 'block']} />
      </div>

      <div className="k-form-field">
        <Field
          name="recurrenceRule"
          displayName="Recurrence"
          component={RecurrenceEditor}
        />
      </div>

      <p>{props.valueGetter('recurrenceRule')}</p>
      <p>{props.valueGetter('title')}</p>
    </FormElement>
  );

  // return <SchedulerFormEditor {...props} />;
}

export function CustomForm(props) {
  return <SchedulerForm {...props} editor={CustomEditor} />;
}
