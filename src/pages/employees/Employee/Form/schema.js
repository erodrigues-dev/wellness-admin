import * as yup from 'yup';

const schema = yup.object().shape({
  id: yup.number(),
  name: yup.string().min(3).max(50).required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(3)
    .max(8)
    .when('id', (id, mixed) => (id ? mixed : mixed.required())),
  confirmPassword: yup
    .string()
    .label('confirm password')
    .oneOf(
      [yup.ref('password')],
      'confirm password must be match with password'
    )
    .when(['id', 'password'], (id, pwd, mixed) =>
      !id || !!pwd ? mixed.required() : mixed
    ),
});

export default schema;
