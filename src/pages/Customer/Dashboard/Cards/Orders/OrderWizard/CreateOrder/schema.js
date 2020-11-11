import * as yup from 'yup';

const schema = yup.object().shape({
  id: yup.number(),
  relationType: yup.string().required(),
  relation: yup
    .number()
    .min(1, 'Select a Package/Type')
    .required('Select a Package/Type'),
  quantity: yup.number().min(1, 'Quantity must be greater than 0').required(),
});

export default schema;