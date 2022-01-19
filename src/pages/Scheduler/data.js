export const group = {
  resources: ['Categories', 'Calendars'],
  orientation: 'horizontal',
};

export const resources = [
  {
    name: 'Categories',
    data: [
      {
        text: 'Workout',
        value: 1,
        color: '#556677',
      },
      {
        text: 'Massage',
        value: 2,
        color: '#556699',
      },
      {
        text: 'Terapy',
        value: 3,
        color: '#552255',
      },
    ],
    field: 'categoryId',
    valueField: 'value',
    textField: 'text',
    colorField: 'color',
  },
  {
    name: 'Calendars',
    data: [
      {
        text: 'Peternnn',
        value: 1,
      },
      {
        text: 'Alex',
        value: 2,
      },
    ],
    field: 'calendarId',
    valueField: 'value',
    textField: 'text',
  },
];

export const data = [
  // {
  //   id: 1,
  //   title: 'Slot 01',
  //   start: new Date('2022-01-18T09:00'),
  //   end: new Date('2022-01-18T09:30'),
  //   categoryId: 1,
  //   calendarId: 1,
  // },
  // {
  //   id: 2,
  //   title: 'Slot 02',
  //   start: new Date('2022-01-18T09:00'),
  //   end: new Date('2022-01-18T10:00'),
  //   categoryId: 1,
  //   calendarId: 2,
  // },
  // {
  //   id: 3,
  //   title: 'Slot 03',
  //   start: new Date('2022-01-18T09:00'),
  //   end: new Date('2022-01-18T10:00'),
  //   categoryId: 2,
  //   calendarId: 2,
  // },
];
