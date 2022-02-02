import * as yup from 'yup';

export const validationSchema = yup.object({
  activityId: yup.string().required().label('activity'),
  customerId: yup.string().required().label('customer'),
});

export const initialValues = {
  activityId: '',
  customerId: '',
};
