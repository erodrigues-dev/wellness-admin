import * as yup from 'yup';

export const validationSchema = yup.object({
  id: yup.string(),
  name: yup.string().required(),
  color: yup.string().required(),
});

export const getInitialValues = (value) => ({
  id: value?.id ?? '',
  name: value?.name ?? '',
  color: value?.color ?? '',
});
