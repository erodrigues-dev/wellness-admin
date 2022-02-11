import * as yup from 'yup';

export const validationSchema = yup.object({
  activity: yup.object({
    id: yup.string().required().label('activity'),
    duration: yup.number(),
  }),
  customerId: yup.string().required().label('customer'),
  start: yup.string().required(),
});

export const getInitialValues = ({ start }) => ({
  activity: {
    id: '',
    duration: '',
  },
  customerId: '',
  notes: '',
  start: start ?? '',
});
