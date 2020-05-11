import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().min(3).max(20).required(),
  description: yup.string().min(3).max(100).required(),
  functionalities: yup
    .array()
    .required('must be checked at least one functionality'),
});

export default schema;
