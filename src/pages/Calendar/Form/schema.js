import * as yup from 'yup';

export const initialValues = {
  name: '',
  categoryId: '',
  minHoursToSchedule: 12,
  minHoursToCancel: 12,
  maxDaysInFuture: 365,
  maxEntryPerSlot: 1,
};

export const validationSchema = yup.object({
  name: yup.string().required(),
  categoryId: yup.number().required().label('category'),
  minHoursToSchedule: yup.number().min(1).required().label('this'),
  minHoursToCancel: yup.number().min(1).required().label('this'),
  maxDaysInFuture: yup.number().min(1).required().label('this'),
  maxEntryPerSlot: yup.number().min(1).required().label('this'),
});
