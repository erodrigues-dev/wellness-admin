/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { toast } from 'react-toastify';

import { DropDownList } from '@progress/kendo-react-dropdowns';

function ValueRender(all, selecteds) {
  return function render(element) {
    const valueRender =
      all === selecteds ? (
        <span>All selecteds</span>
      ) : (
        <span>{selecteds} selecteds</span>
      );

    return React.cloneElement(element, element.props, valueRender);
  };
}

function ItemRender(li, itemProps) {
  const { id, selected, label } = itemProps.dataItem;

  const itemRender = (
    <label key={id}>
      <input
        type="checkbox"
        style={{ marginRight: 4 }}
        defaultChecked={selected}
      />
      {label}
    </label>
  );
  return React.cloneElement(li, li.props, itemRender);
}

export function CalendarSelect({ calendars, selecteds, onChange }) {
  const allOption = {
    id: 'all',
    label: 'All',
    selected: calendars.length === selecteds.length,
  };
  const data = calendars.map((item) => ({
    id: item.id,
    label: item.name,
    selected: selecteds.some((selected) => selected.id === item.id),
  }));

  const handleChange = (ev) => {
    const { selected, id } = ev.value;

    const isAllOption = id === 'all';
    const shouldAdd = !selected;
    const hasOnlyOne = selecteds.length === 1;

    if (isAllOption) {
      if (shouldAdd) onChange(calendars);
      else onChange([calendars[0]]);
    } else if (shouldAdd) {
      const calendar = calendars.find((c) => c.id === id);
      onChange([calendar, ...selecteds]);
    } else if (hasOnlyOne) {
      toast.error('Must have at least one calendar');
    } else {
      onChange(selecteds.filter((x) => x.id !== id));
    }
  };

  return (
    <DropDownList
      dataItemKey="id"
      textField="label"
      data={[allOption, ...data]}
      value={null}
      onChange={handleChange}
      itemRender={ItemRender}
      valueRender={ValueRender(data.length, selecteds.length)}
    />
  );
}
