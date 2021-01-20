import React from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';
import * as yup from 'yup';

import ButtonLoading from '~/components/ButtonLoading';
import useAuth from '~/contexts/auth';
import useNotification from '~/contexts/notification';

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const RecoverPassword = ({ setRecovery, seconds, setSeconds }) => {
  const { recoverPassword } = useAuth();
  const { sendNotification } = useNotification();

  const formik = useFormik({
    validationSchema: schema,
    initialValues: { email: '' },
    onSubmit: handleSubmit,
  });

  async function handleSubmit(data) {
    setSeconds(60);
    try {
      await recoverPassword(data);

      sendNotification(
        'A temporary password has been sent to your email, wait a few moments and check your inbox'
      );
    } catch (error) {
      sendNotification(error.message, false);
    }
  }

  return (
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

      <ButtonLoading
        block
        className="mb-3"
        type="submit"
        loading={formik.isSubmitting}
        disabled={seconds > 0}
      >
        {seconds > 0 ? seconds : 'Recover my Password'}
      </ButtonLoading>
      <Link to="/sign-in" onClick={() => setRecovery(false)}>
        Back to Sign In
      </Link>
    </Form>
  );
};

export default RecoverPassword;
