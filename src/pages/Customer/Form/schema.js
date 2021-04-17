import * as yup from 'yup';

const schema = yup.object({
  id: yup.string(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().max(20),
});

export default schema;
