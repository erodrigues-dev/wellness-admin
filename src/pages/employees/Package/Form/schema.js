import * as yup from 'yup';

import { sanitize } from '~/helpers/sanitize';

const schema = yup.object().shape({
  id: yup.number(),
  name: yup.string().min(3).max(50).required(),
  description: yup.string().required(),
  price: yup
    .number()
    .positive()
    .min(0.01)
    .max(999999999.99)
    .required()
    .transform((_value, originalValue) => sanitize.number(originalValue)),
  activities: yup
    .array()
    .of(
      yup.object({
        id: yup.number(),
        quantity: yup.number().min(1).required(),
      })
    )
    .required('must be add at least on activity'),
});

export default schema;
