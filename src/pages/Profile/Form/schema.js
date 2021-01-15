import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  permissions: yup
    .number()
    .min(1, 'you must check at least 1 permission')
    .required(),
});

export default schema;
