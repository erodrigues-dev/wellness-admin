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

export function create({ name, description, permissions }) {
  return api.post(ENDPOINT, {
    name,
    description,
    permissions,
  });
}

export function update({ id, name, description, permissions }) {
  return api.put(ENDPOINT, {
    id,
    name,
    description,
    permissions,
  });
}
