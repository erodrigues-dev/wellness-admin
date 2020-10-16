import React from 'react';
import { Col, Form, Row, Button, Modal } from 'react-bootstrap';

import { useFormik } from 'formik';

import useNotification from '~/contexts/notification';
import service from '~/services/category';

import schema from './schema';

const ModalCategory = ({
  handleOpenModal,
  loadCategories,
  selectedCategory,
}) => {
  const isEdit = !!selectedCategory;
  const { sendNotification } = useNotification();
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      id: isEdit ? selectedCategory.id : 0,
      name: isEdit ? selectedCategory.name : '',
      type: isEdit ? selectedCategory.type : '',
    },
    onSubmit: handleSubmit,
    onReset: handleSubmit,
  });

  async function handleSubmit(values) {
    try {
      if (isEdit) {
        await service.update(values.id, values.name, values.type);
      } else {
        await service.create(values.name, values.type);
      }

      sendNotification('Add category successfuly.');

      loadCategories();
      handleOpenModal(false);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }

  return (
    <Modal.Body>
      <Form onSubmit={formik.handleSubmit}>
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
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        {!isEdit && (
          <Row>
            <Form.Group as={Col}>
              <Form.Control
                as="select"
                custom
                name="type"
                value={formik.values.type}
                onChange={(e) => formik.setFieldValue('type', e.target.value)}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.type && formik.errors.type}
                isValid={formik.touched.type && !formik.errors.type}
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="activity">Activity</option>
                <option value="package">Package</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formik.errors.type}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        )}
        <Row>
          <Col className="d-flex justify-content-end align-items-start">
            <Button
              type="reset"
              className="ml-2"
              onClick={() => handleOpenModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              className="ml-2"
              onClick={formik.handleSubmit}
            >
              {`${isEdit ? 'Edit' : 'Add'} Category`}
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal.Body>
  );
};

export default ModalCategory;
