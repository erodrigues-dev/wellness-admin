import React from 'react';
import { Form } from 'react-bootstrap';

export function Input({
  name,
  label,
  error,
  children,
  groupOptions = {},
  inputOptions = {},
}) {
  return (
    <Form.Group {...groupOptions}>
      <Form.Label>{label}</Form.Label>
      <Form.Control name={name} {...inputOptions}>
        {children}
      </Form.Control>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
}

export function InputFormikAdapter({ formik, ...options }) {
  const { name: inputName = '', onChange } = options;

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
    <Input
      {...options}
      inputOptions={{
        ...options.inputOptions,
        value: getProperty('values'),
        onChange: onChange ?? formik.handleChange,
        onBlur: formik.handleBlur,
        isValid: formik.touched[fieldName] && !getError(),
        isInvalid: formik.touched[fieldName] && getError(),
      }}
      error={getError()}
    />
  );
}
