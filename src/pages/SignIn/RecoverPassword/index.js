import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';

import { useFormik } from 'formik';
import * as yup from 'yup';

import ButtonLoading from '~/components/ButtonLoading';
import useNotification from '~/contexts/notification';
import * as authService from '~/services/auth';

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const RecoverPassword = ({
  setRecovery,
  seconds,
  setSeconds,
  recoverEmail,
  setRecoverEmail,
}) => {
  const { sendNotification } = useNotification();

  const { setValues, ...formik } = useFormik({
    validationSchema: schema,
    initialValues: { email: '' },
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (recoverEmail) setValues(recoverEmail);
  }, [recoverEmail, setValues]);

  async function handleSubmit(data) {
    setSeconds(60);
    setRecoverEmail(data);
    try {
      if (seconds <= 0) {
        await authService.recoverPassword(data);

        sendNotification(
          'A temporary password has been sent to your email, wait a few moments and check your inbox'
        );
      } else {
        sendNotification(
          'You must wait 60 seconds to sent a new temporary password'
        );
      }
    } catch (error) {
      sendNotification(error.message, false);
    }
  }

  function handleEmailChange(e) {
    const { name, value } = e.target;

    formik.setFieldValue(name, value);

    if (recoverEmail) setRecoverEmail('');
  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control
          placeholder="E-mail"
          name="email"
          value={formik.values.email}
          onChange={handleEmailChange}
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
        {seconds > 0
          ? `Please wait ${seconds}s to resend`
          : 'Recover my Password'}
      </ButtonLoading>
      <button
        className="btn-forgot-password"
        type="button"
        onClick={() => setRecovery(false)}
      >
        Back to Sign In
      </button>
    </Form>
  );
};

export default RecoverPassword;
