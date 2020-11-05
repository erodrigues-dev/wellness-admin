import * as yup from 'yup';

const schema = yup.object().shape({
  id: yup.number(),
  customerId: yup.number().min(1, 'Select a Customer').required(),
  relationType: yup.string().required(),
  relationId: yup
    .number()
    .min(1, 'Select a Package/Type')
    .required('Select a Package/Type'),
  quantity: yup.number().min(1, 'Quantity must be greater than 0').required(),
});

export default schema;
