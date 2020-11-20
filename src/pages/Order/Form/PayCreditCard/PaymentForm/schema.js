import * as yup from 'yup';

import { sanitize } from '~/helpers/sanitize';

const schema = yup.object().shape({
  dueDate: yup.date(),
  saveCard: yup.boolean(),
  cardId: yup.string(),
  cardName: yup.string().when('cardId', {
    is: (val) => val === undefined || !val,
    then: yup.string().required('Card Holder Name is a required field'),
    otherwise: yup.string().notRequired(),
  }),
  recurrencyPay: yup.boolean(),
  tip: yup
    .number()
    .positive()
    .min(0.01)
    .max(999999999.99)
    .notRequired()
    .transform((_value, originalValue) => sanitize.number(originalValue)),
});

export default schema;
