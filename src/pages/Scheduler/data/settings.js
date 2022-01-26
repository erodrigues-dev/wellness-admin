export const settings = {
  startTime: '01:00',
  endTime: '23:00',
  workDayStart: '07:00',
  workDayEnd: '19:00',
  slotDivisions: 4,
  slotDuration: 60,
  calendarMinWidth: 260,
  group: {
    resources: ['Calendars'],
    orientation: 'horizontal',
  },
  resources: {
    name: 'Calendars',
    data: [],
    field: 'calendarId',
    valueField: 'id',
    textField: 'name',
  },
};
