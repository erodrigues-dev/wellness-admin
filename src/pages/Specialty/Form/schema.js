import * as yup from 'yup';

const schema = yup.object().shape({
  id: yup.number().nullable(),
  name: yup.string().max(100).required(),
});

export default schema;
