import {
  parseJSON,
  formatDistanceToNow,
  format,
  parseISO,
  startOfDay,
  parse,
  addMinutes,
  addMonths,
  endOfDay,
} from 'date-fns';

export { addMinutes, addMonths, endOfDay };

const TIMEZONE = /\((.*)\)/.exec(new Date().toString())[1];

export function formatToList(value) {
  const date = parseJSON(value);
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatToDisplay(value) {
  const date = parseJSON(value);
  return format(date, 'MM/dd/y');
}

/**
 * formatDateTime
 * @returns {string} formated in mm/dd/yyyy hh:mm
 * @param {Date} date
 */
export function formatToDateTime(date) {
  if (date instanceof Date) return format(date, 'MM/dd/y h:mm a');

  return null;
}

export function formatToSubmit(date) {
  if (date instanceof Date) return format(date, 'y-MM-dd');

  return null;
}

export function getTimezone() {
  return TIMEZONE;
}

export function formatToTime(date) {
  if (date instanceof Date) return format(date, 'h:mm a').toLowerCase();

  return date;
}

/**
 * create date tieme
 * @param {Date} date
 * @param {string} time
 */
export function createDateTime(date, time) {
  const datetime = new Date(date);
  const isPM = time.includes('pm');
  const [, hours, minutes] = /^(\d?\d):(\d\d)/.exec(time);

  datetime.setHours(isPM ? Number(hours) + 12 : Number(hours));
  datetime.setMinutes(Number(minutes));
  datetime.setSeconds(0);
  datetime.setMilliseconds(0);

  return datetime;
}

export function clearTime(date) {
  return startOfDay(date);
}

/**
 * timeIsBefore
 * @param {string} timeA format: 'hh:mm am'
 * @param {string} timeB format: 'hh:mm am'
 */
export function timeIsBefore(timeA, timeB) {
  const regex = /^(\d?\d):(\d\d)\s([ap]m)$/;
  const [, hourA, minA, merA] = regex.exec(timeA);
  const [, hourB, minB, merB] = regex.exec(timeB);

  if (merA === 'pm' && merB === 'am') return false;
  if (merA === 'am' && merB === 'pm') return true;

  const timeAInMinutes = Number(hourA) * 60 + Number(minA);
  const timeBInMinutes = Number(hourB) * 60 + Number(minB);

  return timeAInMinutes < timeBInMinutes;
}

export function formatTime24To12(time) {
  const dateTime = parse(time, 'HH:mm:ss', new Date());

  return format(dateTime, 'hh:mm aa');
}

export function toDate(date) {
  return parseISO(date);
}

export function toInputValue(date) {
  return new Date(date).toISOString().split('T')[0];
}

export const formatDate = (date, dateFormat) => format(date, dateFormat);
