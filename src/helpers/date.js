import { format, parseJSON } from 'date-fns';

const formats = {
  list: 'dd/MM/yyyy HH:mm',
};

export function formatToList(value) {
  const date = parseJSON(value);
  return format(date, formats.list);
}
