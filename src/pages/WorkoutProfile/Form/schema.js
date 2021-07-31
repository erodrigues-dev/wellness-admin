import * as yup from 'yup';

export const initialValues = {
  id: '',
  customerId: '',
  age: '',
  height: '',
  weight: '',
  goal: '',
  test1: '',
  test2: '',
  injuriesLimitations: '',
  experienceLevel: '',
  notes: '',
};

export const validationSchema = yup.object({
  customerId: yup.number().required().label('Customer'),
  age: yup.number().min(1),
  height: yup.string().max(10),
  weight: yup.number(),
  goal: yup.string().max(60),
  test1: yup.string().max(60),
  test2: yup.string().max(60),
  injuriesLimitations: yup.string().max(60),
  experienceLevel: yup.string().max(60),
  notes: yup.string(),
});
