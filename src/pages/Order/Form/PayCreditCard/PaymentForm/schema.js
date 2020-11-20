import * as yup from 'yup';

const schema = yup.object().shape({
  dueDate: yup.date(),
  saveCard: yup.boolean(),
  cardName: yup.string().when('saveCard', {
    is: true,
    then: yup.string().required('Card Holder Name is a required field'),
    otherwise: yup.string(),
  }),
  cardId: yup.string(),
  tip: yup.string(),
});

export default schema;
