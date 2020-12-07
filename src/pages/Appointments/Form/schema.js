import * as yup from 'yup';

const schema = yup.object().shape({
  id: yup.number(),
  customerId: yup.number().min(1, 'Select a Customer').required(),
  relationId: yup.string().min(1).required('Select an Activity'),
  scheduleDate: yup.string().required('Select an available date'),
  scheduleTime: yup.string().required('Select an available hour'),
});

export default schema;
