import React from 'react';
import { Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import * as yup from 'yup';

import ButtonLoading from '~/components/ButtonLoading';
import useNotification from '~/contexts/notification';
import api from '~/services/api';

import { Container, Box, Logo } from './styles';

const schema = yup.object().shape({
  name: yup.string().min(3).required(),
  email: yup.string().email().required().label('e-mail'),
  password: yup.string().min(3).max(8).required(),
  confirmPassword: yup
    .string()
    .label('confirm password')
    // eslint-disable-next-line
    .oneOf([yup.ref('password')], '${label} must be match to password')
    .required(),
});

const SignUp = () => {
  const history = useHistory();
  const { sendNotification } = useNotification();
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      const { name, email, password } = values;
      await api.post('/customers', { name, email, password });
      sendNotification(
        'Account created with success, use your email and password to signin.'
      );
      history.push('/sign-in');
    } catch (error) {
      let message = 'Unexpected error has ocurred, try again!';
      if (error.response.status === 400) message = error.response.data.message;
      sendNotification(message, false);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <Container>
      <Logo src="/images/logo.png" />
      <Box>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              placeholder="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isValid={formik.touched.name && !formik.errors.name}
              isInvalid={formik.touched.name && !!formik.errors.name}
            />
            <Form.Text className="text-danger">
              {formik.touched.name && formik.errors.name}
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              placeholder="E-mail"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isValid={formik.touched.email && !formik.errors.email}
              isInvalid={formik.touched.email && !!formik.errors.email}
            />
            <Form.Text className="text-danger">
              {formik.touched.email && formik.errors.email}
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              placeholder="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isValid={formik.touched.password && !formik.errors.password}
              isInvalid={formik.touched.password && !!formik.errors.password}
            />
            <Form.Text className="text-danger">
              {formik.touched.password && formik.errors.password}
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              placeholder="Confirm password"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isValid={
                formik.touched.confirmPassword && !formik.errors.confirmPassword
              }
              isInvalid={
                formik.touched.confirmPassword &&
                !!formik.errors.confirmPassword
              }
            />
            <Form.Text className="text-danger">
              {formik.touched.confirmPassword && formik.errors.confirmPassword}
            </Form.Text>
          </Form.Group>
          <ButtonLoading
            type="submit"
            block
            className="mb-3"
            loading={formik.isSubmitting}
          >
            Sign-Up
          </ButtonLoading>
          <p className="m-0">
            Already have an account?
            <Link to="/sign-in" className="ml-1">
              Sign-In
            </Link>
          </p>
        </Form>
      </Box>
    </Container>
  );
};

export default SignUp;
