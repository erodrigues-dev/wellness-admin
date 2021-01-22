import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

import { useFormik } from 'formik';

import AvatarUpload from '~/components/AvatarUpload';
import ButtonLoading from '~/components/ButtonLoading';
import useAuth from '~/contexts/auth';
import useNotification from '~/contexts/notification';
import account from '~/services/account';

import schema from './schema';
import { Container } from './styles';

const Account = () => {
  const { user, updateUserFromToken } = useAuth();
  const { sendNotification } = useNotification();
  const [seconds, setSeconds] = useState(0);
  const [sendingCode, setSendingCode] = useState(false);
  const formik = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmit,
    initialValues: {
      id: user.id,
      name: user.name,
      oldEmail: user.email,
      email: user.email,
      confirmationCode: '',
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
      formik.setFieldValue('confirmationCode', '');
      formik.setFieldValue('oldEmail', data.email);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }

  useEffect(() => {
    let debouncer = 0;
    if (seconds > 0) {
      debouncer = setTimeout(
        () => setSeconds((prevState) => prevState - 1),
        1000
      );
    }

    return () => {
      clearTimeout(debouncer);
    };
  }, [seconds, setSeconds]);

  async function handleSendConfirmation() {
    if (formik.errors.name || !formik.values.name) {
      sendNotification('Name must be valid to send a confirmation code', false);

      return;
    }

    setSeconds(60);
    setSendingCode(true);
    try {
      await account.sendConfirmation(formik.values);
    } catch (error) {
      sendNotification(error.message, false);
    } finally {
      setSendingCode(false);
    }
  }

  return (
    <Card body>
      <Card.Title>Account</Card.Title>
      <hr />
      <Container>
        <Form onSubmit={formik.handleSubmit}>
          <AvatarUpload
            imageUrl={formik.values.imageUrl}
            handleFile={setImage}
          />
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="ex: Employee 1"
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

          <Row>
            <Col md="6">
              <Form.Group>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  placeholder="ex: email@example.com"
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
            </Col>
            <Col md="4">
              <Form.Group>
                <Form.Label>Confirmation Code</Form.Label>
                <Form.Control
                  placeholder="ex: ABC123"
                  name="confirmationCode"
                  value={formik.values.confirmationCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.confirmationCode &&
                    formik.errors.confirmationCode
                  }
                  isValid={
                    formik.touched.confirmationCode &&
                    !formik.errors.confirmationCode
                  }
                  disabled={user.email === formik.values.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.confirmationCode}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="2" className="d-flex mt-2 justify-content-center">
              <ButtonLoading
                block
                className="align-self-center"
                onClick={handleSendConfirmation}
                loading={sendingCode}
                disabled={
                  seconds > 0 ||
                  user.email === formik.values.email ||
                  !formik.values.name
                }
              >
                {seconds > 0 ? `Wait ${seconds}s to resend` : 'Send Code'}
              </ButtonLoading>
            </Col>
          </Row>

          <Form.Group>
            <Form.Label>Specialty</Form.Label>
            <Form.Control
              placeholder="Speciality"
              name="specialty"
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
              onClick={() => formik.resetForm()}
              disabled={formik.isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="secondary"
              className="ml-2"
              disabled={formik.isSubmitting}
            >
              Save
            </Button>
          </div>
        </Form>
      </Container>
    </Card>
  );
};

export default Account;
