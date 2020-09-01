import * as yup from 'yup';

const schema = yup.object().shape({
  id: yup.number(),

  activityId: yup.number(),

  title: yup.string().max(120).required(),

  color: yup.string().max(7).required(),

  start: yup.date().required().min(new Date()),

  end: yup
    .date()
    .when('start', (value, mix) => {
      if (value) {
        const date = new Date(value);
        date.setMinutes(date.getMinutes() + 1);
        return mix.min(date);
      }
      return mix;
    })
    .required(),

  repeat: yup
    .number()
    .integer()
    .typeError('repeat every must be a number')
    .required('repeat every is a required field')
    .min(1, 'repeat every must be greater than zero'),

  recurrence: yup.string().required(),

  weekDays: yup
    .array()
    .label('week days')
    .when('recurrence', (value, mix) =>
      value === 'weekly' ? mix.required() : mix
    ),

  endsIn: yup.string().required(),

  expiration: yup.date().when(['endsIn', 'end'], (endsIn, end, mix) => {
    let expirationMix = mix;
    if (endsIn === 'in') {
      expirationMix = expirationMix.required();
      if (end) {
        const date = new Date(end);
        date.setMinutes(date.getMinutes() + 1);
        expirationMix = expirationMix.min(date);
      }
    }
    return expirationMix;
  }),

  ocurrences: yup
    .number()
    .min(1)
    .integer()
    .when('endsIn', (value, mix) => (value === 'after' ? mix.required() : mix)),
});

export default schema;
