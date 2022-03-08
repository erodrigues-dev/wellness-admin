import React from 'react';
import { Button } from 'react-bootstrap';
import { RiArrowLeftSLine, RiCloseFill } from 'react-icons/ri';

import { useFormik } from 'formik';

import { Input } from '~/components/Form/Input';

import { useCalendarLabel } from '../../data/CalendarLabelContext';
import { FooterContainer, HeaderContainer } from '../../styles';
import { validationSchema, getInitialValues } from './schema';
import { Container } from './styles';

export function CalendarLabelForm({ isEdit, label }) {
  const { onSubmit, closeForm, closeList, handleDeleteLabel } =
    useCalendarLabel();

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
      <HeaderContainer>
        <button type="button" onClick={closeForm} title="Back">
          <RiArrowLeftSLine />
        </button>
        <span>{isEdit ? 'Edit' : 'Create'} label</span>
        <button type="button" onClick={closeList} title="Close">
          <RiCloseFill />
        </button>
      </HeaderContainer>

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
        {isEdit && (
          <Button type="button" variant="danger" onClick={handleDeleteLabel}>
            Delete
          </Button>
        )}
        <Button type="button" onClick={formik.submitForm}>
          Submit
        </Button>
      </FooterContainer>
    </Container>
  );
}
