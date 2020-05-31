export function number(value) {
  if (!value) return null;
  if (typeof value === 'number') return value;
  const sanitized = value.replace(/,/g, '');
  return parseFloat(sanitized);
}

export const sanitize = {
  number,
};
