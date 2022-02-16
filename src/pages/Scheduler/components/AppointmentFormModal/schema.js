import * as yup from 'yup';

export const validationSchema = yup.object({
  activity: yup.object({
    id: yup.string().required().label('activity'),
    duration: yup.number(),
  }),
  customerId: yup.string().required().label('customer'),
  dateStart: yup.string().required().label('start date'),
});

export const getInitialValues = ({ dateStart, calendarId }) => ({
  dateStart: dateStart ?? '',
  calendarId: calendarId ?? '',
  customerId: '',
  notes: '',
  activity: {
    id: '',
    name: '',
    duration: '',
  },
});
