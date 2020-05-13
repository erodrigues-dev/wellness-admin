import api from './api';

const ENDPOINT = '/profiles';
const ROWS = 10;

export function get(id) {
  return api.get(`${ENDPOINT}/${id}`);
}

export function list(page, filters) {
  return api.get(ENDPOINT, {
    params: {
      page,
      rows: ROWS,
      ...filters,
    },
  });
}

export function create({ name, description, functionalities }) {
  return api.post(ENDPOINT, {
    name,
    description,
    functionalities,
  });
}

export function update({ id, name, description, enabled, functionalities }) {
  return api.put(ENDPOINT, {
    id,
    name,
    description,
    enabled,
    functionalities,
  });
}

export function listFunctionalities() {
  return [
    'Activities',
    'Customers',
    'Employees',
    'Packages',
    'Profiles',
    'Schedules',
  ];
}
