import React from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';
import * as yup from 'yup';

import ButtonLoading from '~/components/ButtonLoading';
import useAuth from '~/contexts/auth';
import useNotification from '~/contexts/notification';

import { Container, Box, Logo } from './styles';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required(),
});

const SignIn = () => {
  const { sendNotification } = useNotification();
  const { signIn } = useAuth();
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { email, password } = values;
      setSubmitting(true);
      await signIn({ email, password });
      sendNotification('Welcome! You are signed with success!');
    } catch (error) {
      sendNotification(error.message, false);
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    validationSchema: schema,
    initialValues: { email: '', password: '' },
    onSubmit: handleSubmit,
  });

  return (
    <Container>
      <Logo src="/images/logo.png" />
      <Box>
        <Form onSubmit={formik.handleSubmit}>
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

          <ButtonLoading
            block
            className="mb-3"
            type="submit"
            loading={formik.isSubmitting}
          >
            Sign In
          </ButtonLoading>
          <p className="m-0">
            No account?
            <Link to="/sign-up" className="ml-1">
              Create one
            </Link>
          </p>
        </Form>
      </Box>
    </Container>
  );
};

export default SignIn;
