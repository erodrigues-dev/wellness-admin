import React, { useState, useRef } from 'react';
import { Form } from 'react-bootstrap';

import { DropDownList, MultiSelect } from '@progress/kendo-react-dropdowns';
import { Error } from '@progress/kendo-react-labels';

const defaultStyles = ({ disabled }) => ({
  width: '100%',
  backgroundColor: disabled ? '#e9ecef' : 'white',
  borderRadius: '0.25rem',
});

function listNoDataRender(element, loading) {
  const noData = <p>{loading ? 'Loading...' : 'No data found.'}</p>;

  return React.cloneElement(element, { ...element.props }, noData);
}

function SelectComponent({ multiple, ...props }) {
  if (multiple) return <MultiSelect {...props} />;
  return <DropDownList {...props} />;
}

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
  disabled = false,
  isValid,
  error,
  multiple = false,
  appendToBody = false,
  ...otherSettings
}) {
  const appendToRef = useRef(null);
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
      <SelectComponent
        multiple={multiple}
        style={defaultStyles({ disabled })}
        popupSettings={{ appendTo: appendToRef.current }}
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
        listNoDataRender={(el) => listNoDataRender(el, data.loading)}
        {...otherSettings}
      />
      {isValid || <Error>{error}</Error>}
      {appendToBody || <div ref={appendToRef} />}
    </Form.Group>
  );
}

export function AutoCompleteFormikAdapter({
  formik,
  formikGetValue,
  ...options
}) {
  const { name: inputName, itemKey, onChange } = options;

  function getValue(value) {
    if (formikGetValue) return formikGetValue(value);

    return Array.isArray(value)
      ? value.map((item) => item[itemKey])
      : value[itemKey];
  }

  // If the formik field value is an object,
  // It will get the main property inside this object
  // Otherwise, it would try to render an object and
  // Throw an error.
  // example: get the property id inside an object with id and text.
  const hasIdentifier = () => inputName.includes('.');

  const getFieldNameProperty = (property) => {
    const isName = property === 'name';

    if (!hasIdentifier()) return isName ? inputName : '';

    const [name, identifier] = inputName.split('.');

    return isName ? name : identifier;
  };

  const fieldName = getFieldNameProperty('name');
  const fieldIdentifier = getFieldNameProperty('identifier');

  const getProperty = (property) => {
    const field = formik[property][fieldName];

    return hasIdentifier() && field ? field[fieldIdentifier] : field;
  };

  const getError = () => getProperty('errors') ?? '';

  return (
    <AutoComplete
      {...options}
      onChange={
        onChange ||
        ((value) => {
          const formikValue = getValue(value);
          formik.setFieldValue(fieldName, formikValue);
        })
      }
      onBlur={() => formik.setFieldTouched(fieldName)}
      isValid={!(formik.touched[fieldName] && formik.errors[fieldName])}
      error={getError()}
    />
  );
}
