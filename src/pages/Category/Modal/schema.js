import * as yup from 'yup';

const schema = yup.object().shape({
  id: yup.number().notRequired(),
  name: yup.string().required(),
  type: yup.string().required(),
});

export default schema;
