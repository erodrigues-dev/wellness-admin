import * as yup from 'yup';

const schema = yup.object().shape({
  id: yup.number(),
  name: yup.string().min(3).max(50).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(20),
  confirmPassword: yup
    .string()
    .label('confirm password')
    .oneOf(
      [yup.ref('password')],
      'confirm password must be match with password'
    ),
  specialty: yup.string().max(100),
});

export default schema;
