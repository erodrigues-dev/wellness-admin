import React from 'react';
import { FormGroup, FormLabel } from 'react-bootstrap';

import InputDateTimePicker from '../InputDateTimePicker';

export function DateTimePicker({ label, groupOptions = {}, ...props }) {
  return (
    <FormGroup {...groupOptions}>
      <FormLabel>{label}</FormLabel>
      <InputDateTimePicker {...props} />
    </FormGroup>
  );
}

export function DateTimePickerFormikAdapter({ formik, ...props }) {
  const { name } = props;

  return (
    <DateTimePicker
      {...props}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      isValid={Boolean(formik.touched[name] && !formik.errors[name])}
      isInvalid={Boolean(formik.touched[name] && formik.errors[name])}
      feedback={formik.errors[name]}
    />
  );
}
