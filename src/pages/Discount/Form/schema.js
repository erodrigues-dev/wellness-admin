import * as yup from 'yup';

import { sanitize } from '~/helpers/sanitize';

const schema = yup.object().shape({
  id: yup.number(),
  customerId: yup
    .number()
    .min(1, 'Select a Customer')
    .required('Customer is a required field'),
  relationType: yup.string().required('Select an option'),
  relationId: yup
    .number()
    .min(1, 'Select a Package/Type')
    .required('Package/Activity is a required field'),
  relationPrice: yup.string(),
  type: yup.string().required('Select an option'),
  value: yup
    .number()
    .when('type', {
      is: (val) => val === 'percent',
      then: yup.number().positive().min(1).max(100),
      otherwise: yup
        .number()
        .min(0.1)
        .max(
          yup.ref('relationPrice'),
          'Discount must be less than the relation value.'
        )
        .transform((_value, originalValue) => sanitize.number(originalValue)),
    })
    .required('Value is a required field'),
});

export default schema;
