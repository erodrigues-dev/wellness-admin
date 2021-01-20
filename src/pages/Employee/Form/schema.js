import * as yup from 'yup';

const schema = yup.object().shape({
  id: yup.number(),
  name: yup.string().min(3).max(50).required(),
  email: yup.string().email().required(),
  phone: yup.string().max(20),
  profileId: yup.number().label('profile').required(),
  specialty: yup.string().max(100),
});

export default schema;
