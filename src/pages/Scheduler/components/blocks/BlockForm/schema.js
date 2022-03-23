import * as yup from 'yup';

const defaultCustomer = {
  id: '',
  name: '',
};

export const validationSchema = yup.object({
  id: yup.string(),
  dateStart: yup.string().required().label('start date'),
  dateEnd: yup.string().required().label('end date'),
  calendar: yup.object({
    id: yup.string().required().label('calendar'),
    name: yup.string(),
  }),
});

export const getInitialValues = ({ id, calendar, dateStart, dateEnd }) => ({
  id: id ?? '',
  dateStart: dateStart ?? '',
  dateEnd: dateEnd ?? '',
  calendar: calendar ?? defaultCustomer,
});
