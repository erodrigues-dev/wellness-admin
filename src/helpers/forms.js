export function clearEmptyFields(data, valueToEmpty = null) {
  const values = { ...data };

  Object.keys(values).forEach((key) => {
    const isEmpty = values[key] === '';
    if (isEmpty) values[key] = valueToEmpty;
  });

  return values;
}
