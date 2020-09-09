import { parseJSON, formatDistanceToNow, format } from 'date-fns';

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
  return /\((.*)\)/.exec(new Date().toString())[1];
}
