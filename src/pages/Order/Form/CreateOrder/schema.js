import * as yup from 'yup';

const schema = yup.object().shape({
  customerId: yup.number().min(1).required('Select a Customer'),
  itemType: yup.string().required(),
  item: yup
    .number()
    .min(1, 'Select a Package/Type')
    .required('Select a Package/Type'),
  quantity: yup.number().min(1, 'Quantity must be greater than 0').required(),
});

export default schema;
