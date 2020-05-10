import React, { useEffect } from 'react';
import { Card, Form, Col, Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import useNotification from '~/contexts/notification';
import * as service from '~/services/customer';

import schema from './schema';

function FormComponent() {
  const { sendNotification } = useNotification();
  const { id } = useParams();
  const history = useHistory();
  const action = id ? 'Edit Customer' : 'Add Customer';
  const formik = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmit,
    initialValues: {
      id: 0,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    console.log('id>>>');
    if (!id) return;
    service
      .get(id)
      .then((response) => {
        const { name, email } = response.data;
        formik.setValues({
          id,
          name,
          email,
          password: '',
          confirmPassword: '',
        });
      })
      .catch(({ message }) => sendNotification(message, false));
  }, [id]);

  async function handleSubmit(values, { setSubmitting }) {
    try {
      if (id === undefined) {
        await service.create(values);
        sendNotification('Employee created with success.');
      } else {
        await service.update(values);
        sendNotification('Employee updated with success.');
      }

      history.goBack();
    } catch (error) {
      sendNotification(error.message, false);
      setSubmitting(false);
    }
  }

  function handleCancel() {
    history.goBack();
  }

  return (
    <Card body>
      <Card.Title>{action}</Card.Title>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
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
        <Form.Group>
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            placeholder="E-mail"
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
        <Form.Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.password && formik.errors.password}
              isValid={formik.touched.password && !formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              isValid={
                formik.touched.confirmPassword && !formik.errors.confirmPassword
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="mr-2"
            onClick={handleCancel}
            disabled={formik.isSubmitting}
          >
            Cancel
          </Button>
          <ButtonLoading type="submit" loading={formik.isSubmitting}>
            Save
          </ButtonLoading>
        </Form.Row>
      </Form>
    </Card>
  );
}

export default FormComponent;
