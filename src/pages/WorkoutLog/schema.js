import * as yup from 'yup';

export const initialValues = {
  workoutProfileId: '',
  id: '',
  resume: '',
  date: '',
  notes: '',
  trainers: [],
};

export const validationSchema = yup.object({
  id: yup.number().nullable(),
  workoutProfileId: yup.number().required(),
  resume: yup.string().required(),
  date: yup.date().required(),
  notes: yup.string().nullable(),
  trainers: yup.array().min(1),
});
