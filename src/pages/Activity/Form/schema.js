import * as yup from 'yup';

import { sanitize } from '~/helpers/sanitize';

const schema = yup.object().shape({
  id: yup.number(),
  name: yup.string().min(3).max(50).required(),
  description: yup.string().required(),
  duration: yup.number().positive().min(1).max(99999).required(),
  price: yup
    .number()
    .positive()
    .min(0.01)
    .max(999999999.99)
    .required()
    .transform((_value, originalValue) => sanitize.number(originalValue)),
  employeeId: yup.number().label('employee').required(),
  category: yup.string().required(),
  categoryId: yup.number(),
});

export default schema;
