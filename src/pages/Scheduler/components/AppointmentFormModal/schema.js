import * as yup from 'yup';

export const validationSchema = yup.object({
  activityId: yup.string().required().label('activity'),
  customerId: yup.string().required().label('customer'),
  start: yup.string().required(),
});

export const initialValues = {
  activityId: '',
  customerId: '',
  notes: '',
  start: '',
};
