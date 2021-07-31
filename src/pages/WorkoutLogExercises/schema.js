import * as yup from 'yup';

export const initialValues = {
  workoutLogId: '',
  id: '',
  name: '',
  set1Reps: '',
  set1Weight: '',
  set2Reps: '',
  set2Weight: '',
  set3Reps: '',
  set3Weight: '',
  set4Reps: '',
  set4Weight: '',
  notes: '',
};

export const validationSchema = yup.object({
  id: yup.number().nullable(),
  workoutLogId: yup.number().required(),
  name: yup.string().nullable().required(),
  set1Reps: yup.number().nullable(),
  set1Weight: yup.number().nullable(),
  set2Reps: yup.number().nullable(),
  set2Weight: yup.number().nullable(),
  set3Reps: yup.number().nullable(),
  set3Weight: yup.number().nullable(),
  set4Reps: yup.number().nullable(),
  set4Weight: yup.number().nullable(),
  notes: yup.string().nullable(),
});
