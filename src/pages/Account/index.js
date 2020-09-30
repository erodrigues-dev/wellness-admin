import React, { useRef, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

import { useFormik } from 'formik';

import AvatarUpload from '~/components/AvatarUpload';
import useAuth from '~/contexts/auth';
import useNotification from '~/contexts/notification';
import account from '~/services/account';

import schema from './schema';
import { Container } from './styles';

const Account = () => {
  const formRef = useRef();
  const { user, updateUserFromToken } = useAuth();
  const { sendNotification } = useNotification();
  const formik = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmit,
    initialValues: {
      id: user.id,
      name: user.name,
      email: user.email,
      password: '',
      confirmPassword: '',
      specialty: user.specialty,
      imageUrl: user.imageUrl,
    },
  });

  const [image, setImage] = useState(null);

  async function handleSubmit(data) {
    try {
      const response = await account.update({ ...data, image });

      updateUserFromToken(response.data.token);

      sendNotification('Account updated.');
    } catch (error) {
      sendNotification(error.response.message, false);
    }
  }

  return (
    <Card body>
      <Card.Title>Account</Card.Title>
      <hr />
      <Container>
        <Form ref={formRef} onSubmit={formik.handleSubmit}>
          <AvatarUpload
            imageUrl={formik.values.imageUrl}
            handleFile={setImage}
          />
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

          <Form.Group>
            <Form.Label>Specialty</Form.Label>
            <Form.Control
              placeholder="Speciality"
              name="speciality"
              value={formik.values.specialty}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.specialty && formik.errors.specialty}
              isValid={formik.touched.specialty && !formik.errors.specialty}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.specialty}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="input-wrapper">
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Password"
                type="password"
                name="password"
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

            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                isValid={
                  formik.touched.confirmPassword &&
                  !formik.errors.confirmPassword
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="buttons">
            <Button
              type="reset"
              onClick={() => formRef.current.reset()}
              disabled={formik.isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" variant="secondary" className="ml-2">
              Save
            </Button>
          </div>
        </Form>
      </Container>
    </Card>
  );
};

export default Account;
