import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { useFormik } from 'formik';

import { Input } from '~/components/Form/Input';

import { FooterContainer, HeaderContainer } from '../styles';
import { validationSchema, getInitialValues } from './schema';

export function LabelForm({ isEdit, label, closeForm }) {
  const onSubmit = () => {};

  const formik = useFormik({
    onSubmit,
    validationSchema,
    initialValues: getInitialValues(label),
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <HeaderContainer>{isEdit ? 'Edit' : 'Create'} label</HeaderContainer>

      <Input
        name="name"
        label="Name"
        inputOptions={{
          placeholder: 'Insert the label name',
        }}
      />

      <FooterContainer>
        <Button type="button" variant="secondary" onClick={closeForm}>
          Cancel
        </Button>
        <Button type="button">Submit</Button>
      </FooterContainer>
    </Form>
  );
}
