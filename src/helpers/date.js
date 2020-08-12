import { parseJSON, formatDistanceToNow, format } from 'date-fns';

export function formatToList(value) {
  const date = parseJSON(value);
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatToDisplay(date) {
  return format(date, 'MM/dd/y');
}
