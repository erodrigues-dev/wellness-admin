import { parseJSON, formatDistanceToNow } from 'date-fns';

export function formatToList(value) {
  const date = parseJSON(value);
  return formatDistanceToNow(date, { addSuffix: true });
}
