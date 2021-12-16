import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Error } from '@progress/kendo-react-labels';

export function AutoComplete({
  label,
  name,
  value,
  textField,
  itemKey,
  delay = 500,
  onFilter,
  onChange,
  onBlur,
  onFocus,
  disabled,
  isValid,
  error,
}) {
  const [data, setData] = useState({
    list: [],
    loading: false,
    timeout: null,
    filter: '',
  });

  const handleFilter = ({ filter }) => {
    clearTimeout(data.timeout);
    const timeout = setTimeout(async () => {
      const { data: list } = await onFilter(filter.value);
      setData((state) => ({
        ...state,
        loading: false,
        list,
      }));
    }, delay);

    setData((state) => ({
      ...state,
      timeout,
      loading: true,
      data: [],
      filter: filter.value,
    }));
  };

  const handleChange = (ev) => {
    onChange(ev.value);
  };

  const handleBlur = () => {
    onBlur?.();
  };

  const handleFocus = () => {
    onFocus?.();
  };

  const handleOpen = () => {
    handleFilter({ filter: { value: '' } });
  };

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <DropDownList
        style={{ width: '100%' }}
        popupSettings={{ className: 'z-index-in-modal' }}
        name={name}
        textField={textField}
        dataItemKey={itemKey}
        value={value}
        data={data.list}
        filter={data.filter}
        loading={data.loading}
        onFilterChange={handleFilter}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onOpen={handleOpen}
        valid={isValid}
        disabled={disabled}
        filterable
      />
      {isValid || <Error>{error}</Error>}
    </Form.Group>
  );
}

export function AutoCompleteFormikAdapter({ formik, ...options }) {
  const { name, itemKey } = options;
  return (
    <AutoComplete
      {...options}
      onChange={(value) => {
        options.onChange(value);
        formik.setFieldValue(name, value[itemKey]);
      }}
      onBlur={() => formik.setFieldTouched(name)}
      isValid={!(formik.touched[name] && formik.errors[name])}
      error={formik.errors[name]}
    />
  );
}
