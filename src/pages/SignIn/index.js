import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

import { useFormik } from 'formik';
import * as yup from 'yup';

import ButtonLoading from '~/components/ButtonLoading';
import useAuth from '~/contexts/auth';
import useToast from '~/hooks/useToast';

import RecoverPassword from './RecoverPassword';
import { Container, Box, Logo } from './styles';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required(),
});

const SignIn = () => {
  const { sendToast } = useToast();
  const { signIn } = useAuth();
  const [recovery, setRecovery] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [recoverEmail, setRecoverEmail] = useState();
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { email, password } = values;
      setSubmitting(true);
      await signIn({ email, password });
      sendToast('Welcome! You are signed with success!');
    } catch (error) {
      sendToast(error.message, false);
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    validationSchema: schema,
    initialValues: { email: '', password: '' },
    onSubmit: handleSubmit,
  });

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

  return (
    <Container>
      <Logo src="/images/logo.png" />
      <Box>
        {recovery ? (
          <RecoverPassword
            setRecovery={setRecovery}
            seconds={seconds}
            setSeconds={setSeconds}
            recoverEmail={recoverEmail}
            setRecoverEmail={setRecoverEmail}
          />
        ) : (
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
            <button
              className="btn-forgot-password"
              type="button"
              onClick={() => setRecovery(true)}
            >
              Forgot my password
            </button>
          </Form>
        )}
      </Box>
    </Container>
  );
};

export default SignIn;
