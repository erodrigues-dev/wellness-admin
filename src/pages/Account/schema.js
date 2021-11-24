import * as yup from 'yup';

const schema = yup.object().shape({
  id: yup.number(),
  name: yup.string().min(3).max(50).required(),
  email: yup.string().email().required(),
  oldEmail: yup.string().email(),
  confirmationCode: yup
    .string()
    .label('confirmation code')
    .when(['oldEmail', 'email'], {
      is: (oldEmail, email) => oldEmail !== email,
      then: yup.string().required(),
    }),
  password: yup.string().min(8).max(20),
  confirmPassword: yup
    .string()
    .label('confirm password')
    .oneOf(
      [yup.ref('password')],
      'confirm password must be match with password'
    ),
});

export default schema;
