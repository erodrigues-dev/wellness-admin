import api from './api';

const ENDPOINT = '/profiles';
const LIMIT = 10;

export function get(id) {
  return api.get(`${ENDPOINT}/${id}`);
}

export function listAll(filters = {}) {
  return api.get(ENDPOINT, {
    ...filters,
  });
}

export function list(page, filters) {
  return api.get(ENDPOINT, {
    params: {
      page,
      limit: LIMIT,
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