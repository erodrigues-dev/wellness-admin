import RR from 'rrule';

export const frequencyData = [
  { label: 'Never', value: null },
  { label: 'Daily', value: RR.DAILY },
  { label: 'Weekly', value: RR.WEEKLY },
  { label: 'Monthly', value: RR.MONTHLY },
  { label: 'Yearly', value: RR.YEARLY },
];
export const daysData = [
  { label: 'Sun', value: RR.SU },
  { label: 'Mon', value: RR.MO },
  { label: 'Tue', value: RR.TU },
  { label: 'Wed', value: RR.WE },
  { label: 'Thu', value: RR.TH },
  { label: 'Fri', value: RR.FR },
  { label: 'Sat', value: RR.SA },
];

export const positionsData = [
  { label: 'First', value: 1 },
  { label: 'Second', value: 2 },
  { label: 'Third', value: 3 },
  { label: 'Fourth', value: 4 },
  { label: 'Last', value: -1 },
];

export const weekDaysData = [
  { label: 'Day', value: [RR.MO, RR.TU, RR.WE, RR.TH, RR.FR, RR.SA, RR.SU] },
  { label: 'Week day', value: [RR.MO, RR.TU, RR.WE, RR.TH, RR.FR] },
  { label: 'Week end day', value: [RR.SA, RR.SU] },
  { label: 'Sunday', value: RR.SU },
  { label: 'Monday', value: RR.MO },
  { label: 'Tuesday', value: RR.TU },
  { label: 'Wednesday', value: RR.WE },
  { label: 'Thursday', value: RR.TH },
  { label: 'Friday', value: RR.FR },
  { label: 'Saturday', value: RR.SA },
];
export const monthsData = [
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 },
];
