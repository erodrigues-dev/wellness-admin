import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { Window, WindowActionsBar } from '@progress/kendo-react-dialogs';
import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import { InputFormikAdapter } from '~/components/Form/Input';

import { useClassContext } from '../../data/ClassContext';
import { useSchedulerContext } from '../../data/SchedulerContext';
import { validationSchema, getInitialValues } from './schema';

export function ClassFormModal() {
  const {
    modal: { type, isOpen },
  } = useSchedulerContext();

  if (type === 'class' && isOpen) {
    return <ClassFormComponent />;
  }

  return null;
}

function ClassFormComponent() {
  const { modal, closeModal } = useSchedulerContext();
  const { onSubmit } = useClassContext();
  const { isEdit } = modal;

  const formik = useFormik({
    onSubmit,
    validationSchema,
    initialValues: getInitialValues(),
  });

  function handleCloseModal() {
    closeModal();
  }

  return (
    <Window
      title={`${isEdit ? 'Edit' : 'Add'} class`}
      initialWidth={600}
      initialHeight={600}
      onClose={handleCloseModal}
    >
      <Form onSubmit={formik.handleSubmit}>
        <InputFormikAdapter
          formik={formik}
          name="notes"
          label="Notes"
          inputOptions={{
            as: 'textarea',
            rows: 3,
          }}
        />
      </Form>

      <WindowActionsBar>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <ButtonLoading onClick={formik.submitForm}>Save</ButtonLoading>
      </WindowActionsBar>
    </Window>
  );
}
