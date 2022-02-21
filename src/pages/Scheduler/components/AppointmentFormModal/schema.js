import * as yup from 'yup';

export const validationSchema = yup.object({
  notes: yup.string().optional().max(600),
  customerId: yup.string().required().label('customer'),
  dateStart: yup.string().required().label('start date'),
  activity: yup.object({
    id: yup.string().required().label('activity'),
    duration: yup.number(),
  }),
  calendar: yup.object({
    id: yup.string().required().label('calendar'),
    name: yup.string(),
  }),
});

export const getInitialValues = ({
  dateStart,
  activity,
  customerId,
  notes,
  calendar,
}) => ({
  dateStart: dateStart ?? '',
  customerId: customerId ?? '',
  notes: notes ?? '',
  calendar: calendar ?? {
    id: '',
    name: '',
  },
  activity: activity ?? {
    id: '',
    name: '',
    duration: '',
  },
});
