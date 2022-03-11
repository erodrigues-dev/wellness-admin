import * as yup from 'yup';

export const validationSchema = yup.object({
  id: yup.string(),
  notes: yup.string().max(600),
  color: yup.string().required(),
  slots: yup.number().positive().required(),
  dateStart: yup.string().required().label('start date'),
  recurrenceRule: yup.string(),
  recurrenceExceptions: yup.string(),
  calendar: yup.object({
    id: yup.string().required().label('calendar'),
    name: yup.string(),
  }),
  activity: yup.object({
    id: yup.string().required().label('activity'),
    duration: yup.number(),
  }),
});

export const getInitialValues = ({
  id,
  notes,
  dateStart,
  activity,
  calendar,
  color,
  slots,
  recurrenceRule,
  recurrenceExceptions,
}) => ({
  id: id ?? '',
  notes: notes ?? '',
  color: color ?? '',
  slots: slots ?? '',
  dateStart: dateStart ?? '',
  recurrenceRule: recurrenceRule ?? '',
  recurrenceExceptions: recurrenceExceptions ?? '',
  calendar: calendar ?? '',
  activity: activity ?? '',
});
