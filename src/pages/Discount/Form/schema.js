import * as yup from 'yup';

const schema = yup.object().shape({
  id: yup.number(),
  customerId: yup.number().required(),
  relationType: yup.string().required(),
  relationId: yup.number().required(),
  type: yup.string().required(),
  value: yup.number().positive().min(0.01).max(999999999.99).required(),
});

export default schema;
