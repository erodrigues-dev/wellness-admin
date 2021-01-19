import * as yup from 'yup';

const schema = yup.object().shape({
  id: yup.string(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().max(20).required(),
  privateNotes: yup.string().optional(),
});

export default schema;
