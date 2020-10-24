import * as yup from 'yup';

import { sanitize } from '~/helpers/sanitize';

const schema = yup.object().shape({
  id: yup.number(),
  customerId: yup.number().min(1, 'Select a Customer').required(),
  relationType: yup.string().required(),
  relationId: yup.number().min(1, 'Select a Package/Type').required(),
  type: yup.string().required(),
  value: yup
    .number()
    .when('type', {
      is: (val) => val === 'percent',
      then: yup.number().positive().min(1).max(100),
      otherwise: yup
        .number()
        .min(0.1)
        .max(999999999.99)
        .transform((_value, originalValue) => sanitize.number(originalValue)),
    })
    .required(),
});

export default schema;
