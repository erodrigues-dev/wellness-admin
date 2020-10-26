import React, { useEffect } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';

import { useFormik } from 'formik';

import useNotification from '~/contexts/notification';
import service from '~/services/category';

import schema from './schema';

const ModalCategory = ({
  handleOpenModal,
  loadCategories,
  selectedCategory,
  addComponent,
  handleValue,
}) => {
  const isEdit = selectedCategory !== undefined;
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

  useEffect(() => {
    if (addComponent) formik.setFieldValue('type', addComponent);
    // eslint-disable-next-line
  }, [addComponent]);

  async function handleSubmit(values) {
    try {
      if (isEdit) {
        await service.update(values.id, values.name);
      } else {
        const { data } = await service.create(values.name, values.type);

        if (addComponent) handleValue(data.id);
      }

      sendNotification(
        `Category ${isEdit ? 'edited' : 'created'} successfuly.`
      );

      loadCategories();
      handleOpenModal(false);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }

  return (
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
      {!isEdit && addComponent === undefined && (
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
  );
};

export default ModalCategory;
