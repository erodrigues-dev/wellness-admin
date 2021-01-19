import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { useFormik } from 'formik';

import AvatarUpload from '~/components/AvatarUpload';
import ButtonLoading from '~/components/ButtonLoading';
import Modal from '~/components/Modal';

import schema from './schema';

const ModalForm = ({ title, customer, setClose }) => {
  const [, setFile] = useState(null);

  const { setValues, ...formik } = useFormik({
    onSubmit: handleSubmit,
    validationSchema: schema,
    initialValues: {
      id: customer?.id ?? '',
      name: customer?.name ?? '',
      email: customer?.email ?? '',
      phone: customer?.phone ?? '',
      imageUrl: customer?.imageUrl ?? '',
      privateNotes: customer?.privateNotes ?? '',
    },
  });

  function handleSubmit() {}

  return (
    <Modal title={title} setClose={setClose}>
      <Form className="modal-form">
        <div className="form-wrapper">
          <AvatarUpload
            imageUrl={formik.values.imageUrl}
            handleFile={setFile}
          />
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="ex: Profile 1"
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
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="ex: yourname@email.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.email && formik.errors.email}
              isValid={formik.touched.email && !formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              placeholder="ex: 555 222 111"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.phone && formik.errors.phone}
              isValid={formik.touched.phone && !formik.errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.phone}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Private Notes</Form.Label>
            <Form.Control
              style={{ resize: 'none' }}
              placeholder="ex: My private notes here"
              as="textarea"
              name="privateNotes"
              value={formik.values.privateNotes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.privateNotes && formik.errors.privateNotes
              }
              isValid={
                formik.touched.privateNotes && !formik.errors.privateNotes
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.privateNotes}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="buttons">
          <Form.Row className="d-flex justify-content-end">
            <Button
              variant="secondary"
              className="mr-2"
              onClick={() => setClose(false)}
            >
              Cancel
            </Button>
            <ButtonLoading type="submit">Save</ButtonLoading>
          </Form.Row>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalForm;
