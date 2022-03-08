import * as yup from 'yup';

const defaultCustomer = {
  id: '',
  name: '',
};

const defaultActivity = {
  id: '',
  name: '',
  duration: '',
};

export const validationSchema = yup.object({
  id: yup.string(),
  notes: yup.string().max(600),
  labelId: yup.string(),
  dateStart: yup.string().required().label('start date'),
  dateEnd: yup.string().label('end date'),
  activity: yup.object({
    id: yup.string().required().label('activity'),
    duration: yup.number(),
  }),
  calendar: yup.object({
    id: yup.string().required().label('calendar'),
    name: yup.string(),
  }),
  customer: yup.object({
    id: yup.string().required().label('customer'),
    name: yup.string(),
  }),
});

export const getInitialValues = ({
  dateStart,
  dateEnd,
  activity,
  customer,
  notes,
  calendar,
  id,
  labelId,
}) => ({
  id: id ?? '',
  notes: notes ?? '',
  dateStart: dateStart ?? '',
  dateEnd: dateEnd ?? '',
  labelId: labelId ?? '',
  customer: customer ?? defaultCustomer,
  calendar: calendar ?? defaultCustomer,
  activity: activity ?? defaultActivity,
});
