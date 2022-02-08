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
  const { name } = options;
  return (
    <Input
      {...options}
      inputOptions={{
        ...options.inputOptions,
        value: formik.values[name],
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        isValid: formik.touched[name] && !formik.errors[name],
        isInvalid: formik.touched[name] && formik.errors[name],
      }}
      error={formik.errors[name]}
    />
  );
}
