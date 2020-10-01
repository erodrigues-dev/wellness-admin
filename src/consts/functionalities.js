export const FUNCTIONALITIES = {
  ACTIVITIES: 'activities',
  CUSTOMERS: 'customers',
  EMPLOYEES: 'employees',
  PACKAGES: 'packages',
  PROFILES: 'profiles',
  CATEGORIES: 'categories',
};

export function listAll() {
  return Object.values(FUNCTIONALITIES).map((value) => ({
    id: value,
    name: capitalize(value),
  }));
}

/**
 *
 * @param {string} value
 */
function capitalize(value) {
  const firstLetter = value[0];
  return `${firstLetter.toUpperCase()}${value.substring(1)}`;
}
