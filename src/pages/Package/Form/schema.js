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
        quantity: yup
          .number()
          .min(1, 'quantity must be greater than or equal to 1')
          .required('quantity must be required'),
      })
    )
    .required('must have at least one activity'),
  category: yup.string().required(),
  categoryId: yup.number(),
  recurrencyPay: yup
    .number()
    .positive()
    .min(0.01)
    .max(999999999.99)
    .required()
    .transform((_value, originalValue) => sanitize.number(originalValue)),
  recurrencyPayType: yup.string().required(),
  type: yup.string().required(),
  total: yup.string().required(),
});

export default schema;
