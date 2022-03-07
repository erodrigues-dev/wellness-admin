import React from 'react';
import { Button } from 'react-bootstrap';

import { useFormik } from 'formik';

import { Input } from '~/components/Form/Input';
import {
  createCalendarLabel,
  updateCalendarLabel,
} from '~/services/calendar-labels';

import { FooterContainer, HeaderContainer } from '../styles';
import { validationSchema, getInitialValues } from './schema';
import { Container } from './styles';

export function LabelForm({ isEdit, label, closeForm }) {
  const onSubmit = (formValues) => {
    const { id, ...values } = formValues;

    if (id) {
      updateCalendarLabel(id, values);
    } else {
      createCalendarLabel(values);
    }

    closeForm();
  };

  const formik = useFormik({
    onSubmit,
    validationSchema,
    initialValues: getInitialValues(label),
  });

  const handleFieldChange = ({ target }) => {
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <Container>
      <HeaderContainer>{isEdit ? 'Edit' : 'Create'} label</HeaderContainer>

      <div className="wrapper">
        <Input
          name="name"
          label="Name"
          inputOptions={{
            placeholder: 'Insert the label name',
            value: formik.values.name,
            onChange: handleFieldChange,
          }}
        />

        <Input
          name="color"
          label="Color"
          inputOptions={{
            value: formik.values.color,
            onChange: handleFieldChange,
            title: 'Choose a color',
            type: 'color',
          }}
        />
      </div>

      <FooterContainer>
        <Button type="button" variant="secondary" onClick={closeForm}>
          Back
        </Button>
        <Button type="button" onClick={formik.submitForm}>
          Submit
        </Button>
      </FooterContainer>
    </Container>
  );
}
