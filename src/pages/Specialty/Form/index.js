import React from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';

import { useFormik } from 'formik';

import useToast from '~/hooks/useToast';
import service from '~/services/specialty';

import schema from './schema';

/**
 *
 * @param {{
 *  onClose: () => void
 *  refreshList: () => Promise<void>,
 *  model: any
 *  action: 'create' | 'display' | 'edit'
 * }} props
 * @returns
 */
const FormSpecialty = ({ onClose, refreshList, model, action }) => {
  const isEdit = action === 'edit';
  const { sendToast } = useToast();
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      id: model?.id ?? null,
      name: model?.name ?? '',
    },
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    try {
      if (isEdit) await service.update(values);
      else await service.create({ name: values.name });

      sendToast(`Specialty ${isEdit ? 'edited' : 'created'} successfuly.`);

      if (refreshList) refreshList();
      onClose();
    } catch (error) {
      sendToast(error.message, false);
    }
  }

  return (
    <Form onSubmit={formik.handleSubmit} className="modal-form">
      <div className="form-wrapper">
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && formik.errors.name}
              isValid={formik.touched.name && !formik.errors.name}
              disabled={action === 'display'}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
      </div>
      <div className="buttons">
        <Row>
          <Col className="d-flex justify-content-end align-items-start">
            <Button type="button" className="ml-2" onClick={onClose}>
              Cancel
            </Button>
            {action !== 'display' && (
              <Button
                type="submit"
                variant="secondary"
                className="ml-2"
                onClick={formik.handleSubmit}
              >
                Save
              </Button>
            )}
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default FormSpecialty;
