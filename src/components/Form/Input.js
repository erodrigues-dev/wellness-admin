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
  const { name = '', identifier = '', onChange } = options;

  const getProperty = (property) =>
    identifier && formik[property][name]
      ? formik[property][name][identifier]
      : formik[property][name];

  const getError = () => getProperty('errors') ?? '';

  return (
    <Input
      {...options}
      inputOptions={{
        ...options.inputOptions,
        value: getProperty('values'),
        onChange: onChange ?? formik.handleChange,
        onBlur: formik.handleBlur,
        isValid: formik.touched[name] && !getError(),
        isInvalid: formik.touched[name] && getError(),
      }}
      error={getError()}
    />
  );
}
