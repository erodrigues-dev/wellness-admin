import React from 'react';

import { Day } from '@progress/kendo-date-math';
import { TimePicker } from '@progress/kendo-react-dateinputs';
import {
  SchedulerSlot,
  SchedulerFormEditor,
  SchedulerForm,
  SchedulerViewItem,
} from '@progress/kendo-react-scheduler';

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

export function CustomForm(formProps) {
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
