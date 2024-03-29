import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { useFormik } from 'formik';

import Avatar from '~/components/Avatar';
import AvatarUpload from '~/components/AvatarUpload';
import ButtonLoading from '~/components/ButtonLoading';
import Modal from '~/components/Modal';
import useToast from '~/hooks/useToast';
import * as customerService from '~/services/customer';

import schema from './schema';

const ModalForm = ({ title, customer, setClose, reloadCustomers, display }) => {
  const { sendToast } = useToast();
  const [file, setFile] = useState(null);

  const { setValues, ...formik } = useFormik({
    onSubmit: handleSubmit,
    validationSchema: schema,
    initialValues: {
      id: '',
      name: '',
      email: '',
      phone: '',
      imageUrl: '',
      privateNotes: '',
      publicNotes: '',
    },
  });

  const getCustomer = useCallback(
    async (customerId) => {
      try {
        const { data } = await customerService.get(customerId);

        setValues({
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data?.phone ?? '',
          imageUrl: data?.imageUrl ?? '',
          privateNotes: data?.privateNotes ?? '',
          publicNotes: data?.publicNotes ?? '',
        });
      } catch (error) {
        sendToast(error.message, false);
      }
    },
    [sendToast, setValues]
  );

  useEffect(() => {
    if (customer) {
      getCustomer(customer.id);
    }
  }, [getCustomer, customer]);

  async function handleSubmit(data) {
    if (display) return;

    try {
      if (customer) {
        await customerService.update({ ...data, file });
      } else {
        await customerService.create({ ...data, file });
      }

      sendToast('Customer saved successfully');
      reloadCustomers();
      setClose(false);
    } catch (error) {
      sendToast(error.message, false);
    }
  }

  return (
    <Modal title={title} setClose={setClose}>
      <Form className="modal-form" onSubmit={formik.handleSubmit}>
        <div className="form-wrapper">
          {display ? (
            <Avatar size="160px" imageUrl={formik.values.imageUrl} />
          ) : (
            <AvatarUpload
              imageUrl={formik.values.imageUrl}
              handleFile={setFile}
            />
          )}
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="ex: Customer 1"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && formik.errors.name}
              isValid={formik.touched.name && !formik.errors.name}
              disabled={display}
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
              disabled={!!customer || display}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              placeholder={!display ? 'ex: 555 111 222' : '-'}
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.phone && formik.errors.phone}
              isValid={formik.touched.phone && !formik.errors.phone}
              disabled={display}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.phone}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Private Notes</Form.Label>
            <Form.Control
              style={{ resize: 'vertical' }}
              placeholder={!display ? 'ex: My private notes here' : '-'}
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
              disabled={display}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.privateNotes}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Public Notes</Form.Label>
            <Form.Control
              style={{ resize: 'vertical' }}
              placeholder={!display ? 'ex: My public notes here' : '-'}
              as="textarea"
              name="publicNotes"
              value={formik.values.publicNotes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.publicNotes && formik.errors.publicNotes
              }
              isValid={formik.touched.publicNotes && !formik.errors.publicNotes}
              disabled={display}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.publicNotes}
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
              {display ? 'Close' : 'Cancel'}
            </Button>
            {!display && <ButtonLoading type="submit">Save</ButtonLoading>}
          </Form.Row>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalForm;
