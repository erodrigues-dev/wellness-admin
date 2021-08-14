import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import Modal from '~/components/Modal';
import { clearEmptyFields } from '~/helpers/forms';
import service from '~/services/notification';

import { ButtonsRight } from '../../../assets/styleds';
import { validationSchema } from './schema';

export function NotificationModalForm({ state, onClose }) {
  const formik = useFormik({
    validationSchema,
    initialValues: {
      title: state.data?.title || '',
      text: state.data?.text || '',
    },
    onSubmit,
  });

  async function onSubmit({ id, ...values }, { setSubmitting }) {
    try {
      if (state.isDisplay) return;

      const data = clearEmptyFields(values);
      await service.create(data);
      onClose({ role: 'created' });
      toast.success('Notification created with success.');
    } catch (error) {
      setSubmitting(false);
      toast.error(error.message);
    }
  }

  return (
    <Modal title="Notification" setClose={onClose}>
      <Form className="p-4" onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            disabled={state.isDisplay}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            isInvalid={formik.touched.title && formik.errors.title}
            isValid={formik.touched.title && !formik.errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.title}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Text</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            name="text"
            disabled={state.isDisplay}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.text}
            isInvalid={formik.touched.text && formik.errors.text}
            isValid={formik.touched.text && !formik.errors.text}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.text}
          </Form.Control.Feedback>
        </Form.Group>

        <ButtonsRight>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          {state.isDisplay || (
            <Button
              variant="secondary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Save
            </Button>
          )}
        </ButtonsRight>
      </Form>
    </Modal>
  );
}
