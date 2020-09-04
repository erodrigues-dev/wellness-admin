import * as yup from 'yup';

const schema = yup.object().shape({
  id: yup.number(),

  activityId: yup.number(),

  title: yup.string().max(120).required(),

  color: yup.string().max(7).required(),

  start: yup.date().required(),

  end: yup
    .date()
    .when('start', (value, mix) => {
      if (value) {
        const date = new Date(value);
        date.setMinutes(date.getMinutes() + 1);
        return mix.min(date, 'end must be later than "start" field');
      }
      return mix;
    })
    .required(),

  repeatEvery: yup
    .number()
    .integer()
    .typeError('repeat every must be a number')
    .required('repeat every is a required field')
    .min(1, 'repeat every must be greater than zero'),

  frequency: yup.string().required(),

  weekDays: yup
    .array()
    .label('week days')
    .when('frequency', (value, mix) =>
      value === 'WEEKLY' ? mix.required() : mix
    ),

  endsIn: yup.string().required(),

  until: yup.date().when(['endsIn', 'end'], (endsIn, end, mix) => {
    let expirationMix = mix;
    if (endsIn === 'IN') {
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
    .typeError('ocurrences must be a number')
    .when('endsIn', (value, mix) => (value === 'AFTER' ? mix.required() : mix)),
});

export default schema;
