import { parseJSON, formatDistanceToNow, format } from 'date-fns';

const TIMEZONE = /\((.*)\)/.exec(new Date().toString())[1];

export function formatToList(value) {
  const date = parseJSON(value);
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatToDisplay(date) {
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
  if (!(date instanceof Date)) return date;

  const dateClear = new Date(date);

  dateClear.setHours(0);
  dateClear.setMinutes(0);
  dateClear.setSeconds(0);
  dateClear.setMilliseconds(0);

  return dateClear;
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

  if (merA === 'am' && merB === 'pm') return true;
  if (Number(hourA) < Number(hourB)) return true;
  if (Number(minA) < Number(minB)) return true;

  return false;
}
