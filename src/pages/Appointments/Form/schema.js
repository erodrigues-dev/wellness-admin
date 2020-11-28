import * as yup from 'yup';

const schema = yup.object().shape({
  id: yup.number(),
  customerId: yup.number().min(1, 'Select a Customer').required(),
  relationId: yup.string().min(1).required('Select an Activity'),
  schedule: yup.string().required('Select an available date'),
});

export default schema;
