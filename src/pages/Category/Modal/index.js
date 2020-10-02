import React from 'react';
import { Col, Form, Row, Button, Modal } from 'react-bootstrap';

import { useFormik } from 'formik';

import useNotification from '~/contexts/notification';
import service from '~/services/category';

const ModalCategory = ({ handleOpenAdd, loadCategories }) => {
  const { sendNotification } = useNotification();
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: handleSubmit,
    onReset: handleSubmit,
  });

  async function handleSubmit(values) {
    try {
      await service.create(values.name);

      sendNotification('Add category successfuly.');

      loadCategories();
    } catch (error) {
      sendNotification(error.message, false);
    }
  }

  return (
    <>
      <Modal.Header close>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Form.Group as={Col} md="12">
              <Form.Control
                placeholder="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Col className="d-flex justify-content-end align-items-start">
              <Button
                type="reset"
                className="ml-2"
                onClick={() => handleOpenAdd(false)}
              >
                Cancel
              </Button>
              <Button
                variant="secondary"
                className="ml-2"
                onClick={formik.handleSubmit}
              >
                Add Category
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </>
  );
};

export default ModalCategory;
