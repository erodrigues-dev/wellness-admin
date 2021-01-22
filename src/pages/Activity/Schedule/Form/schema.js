import * as yup from 'yup';

import { timeIsBefore } from '~/helpers/date';

const schema = yup.object().shape({
  id: yup.number(),

  activityId: yup.number(),

  title: yup.string().max(120).required(),

  color: yup.string().max(7).required(),

  date: yup.date().required(),

  start: yup.string().required().nullable(),

  end: yup
    .string()
    .required()
    .nullable()
    .when('start', (start, mix) =>
      mix.test(
        'end-after-start',
        'end must be later than start',
        (end) => !start || !end || timeIsBefore(start, end)
      )
    ),

  repeatEvery: yup
    .number()
    .integer()
    .typeError('repeat every must be a number')
    .required('repeat every is a required field')
    .min(1, 'repeat every must be greater than zero'),

  frequency: yup.string().required(),

  weekdays: yup
    .array()
    .label('week days')
    .when('frequency', (value, mix) =>
      value === 'WEEKLY' ? mix.required() : mix
    ),

  endsIn: yup.string().required(),

  until: yup.date().when(['endsIn', 'date'], (endsIn, date, mix) => {
    let expirationMix = mix;
    if (endsIn === 'IN') {
      expirationMix = expirationMix.required();
      if (date) {
        const mindate = new Date(date);
        mindate.setMinutes(mindate.getMinutes() + 1);
        expirationMix = expirationMix.min(mindate);
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
