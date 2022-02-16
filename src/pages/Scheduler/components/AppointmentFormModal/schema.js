import * as yup from 'yup';

export const validationSchema = yup.object({
  notes: yup.string().optional().max(600),
  customerId: yup.string().required().label('customer'),
  dateStart: yup.string().required().label('start date'),
  calendarId: yup.string().required().label('start date'),
  activity: yup.object({
    id: yup.string().required().label('activity'),
    duration: yup.number(),
  }),
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
