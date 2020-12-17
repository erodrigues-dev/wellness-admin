import * as yup from 'yup';

const schema = yup.object().shape({
  id: yup.number(),
  customerId: yup
    .number()
    .min(1, 'Select a Customer')
    .required('Select a Customer'),
  relationId: yup
    .number()
    .min(1, 'Select an Activity')
    .required('Select an Activity'),
  date: yup.string().required('Select an available date'),
  timeId: yup.string().required('Select an available hour'),
});

export default schema;
