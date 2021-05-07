import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Modal from '~/components/Modal';
import { get, create, update } from '~/services/waiver';

const initialValues = {
  title: '',
  text: '',
};

const validationSchema = Yup.object({
  title: Yup.string().max(120).required(),
  text: Yup.string().required(),
});

export const FormWaiver = ({ id, onClose, isDisplay, onSave }) => {
  const getTitle = () => {
    if (isDisplay) return 'Display Waiver';
    if (id) return 'Edit Waiver';
    return 'Add Waiver';
  };

  const onSubmit = async (values, { setIsSubmiting }) => {
    try {
      if (isDisplay) return;
      if (id) await update({ id, ...values });
      else create(values);
      onSave();
      onClose();
      toast.success('Waiver saved with succes');
    } catch (error) {
      toast.error(error.message);
      setIsSubmiting(false);
    }
  };

  const { setValues, ...formik } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (!id) return;
    get(id)
      .then(({ data }) =>
        setValues({
          title: data.title,
          text: data.text,
        })
      )
      .catch(() => toast.error('An unexpected error has occurred'));
  }, [id, setValues]);

  return (
    <Modal title={getTitle()} setClose={onClose}>
      <Form onSubmit={formik.handleSubmit} className="p-4">
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={Boolean(formik.touched.title && formik.errors.title)}
            isValid={Boolean(formik.touched.title && !formik.errors.title)}
            disabled={isDisplay}
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
            rows={6}
            placeholder="Text"
            name="text"
            value={formik.values.text}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={Boolean(formik.touched.text && formik.errors.text)}
            isValid={Boolean(formik.touched.text && !formik.errors.text)}
            disabled={isDisplay}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.text}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          {isDisplay || (
            <Button
              variant="secondary"
              className="ml-2"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Save
            </Button>
          )}
        </div>
      </Form>
    </Modal>
  );
};
