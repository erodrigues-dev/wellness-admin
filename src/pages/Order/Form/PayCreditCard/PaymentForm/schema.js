import * as yup from 'yup';

import { sanitize } from '~/helpers/sanitize';

const schema = yup.object().shape({
  dueDate: yup.date(),
  saveCard: yup.boolean(),
  cardName: yup.string().when('saveCard', {
    is: true,
    then: yup.string().required('Card Holder Name is a required field'),
    otherwise: yup.string(),
  }),
  cardId: yup.string(),
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
