import * as yup from 'yup';

const defaultCalendar = {
  id: '',
  name: '',
};

export const validationSchema = yup.object({
  id: yup.string(),
  recurrenceRule: yup.string().label('recurrence'),
  dateStart: yup.string().required().label('start date'),
  dateEnd: yup.string().required().label('end date'),
  calendar: yup.object({
    id: yup.string().required().label('calendar'),
    name: yup.string(),
  }),
});

export const getInitialValues = ({
  id,
  calendar,
  dateStart,
  dateEnd,
  recurrenceRule,
}) => ({
  id: id ?? '',
  dateStart: dateStart ?? '',
  dateEnd: dateEnd ?? '',
  recurrenceRule: recurrenceRule ?? '',
  calendar: calendar ?? defaultCalendar,
});
