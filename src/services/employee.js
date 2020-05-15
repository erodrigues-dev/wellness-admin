import api from './api';

const ENDPOINT = '/employees';
const LIMIT = 10;

export function index(page, filters) {
  return api.get(ENDPOINT, {
    params: {
      page,
      limit: LIMIT,
      ...filters,
    },
  });
}

export function get(id) {
  return api.get(`${ENDPOINT}/${id}`);
}

export function create({ name, email, password, profileId, specialty }) {
  return api.post(ENDPOINT, {
    name,
    email,
    password,
    profileId,
    specialty,
  });
}

export function update({ id, name, email, password, profileId, specialty }) {
  return api.put(ENDPOINT, {
    id,
    name,
    email,
    password,
    profileId,
    specialty,
  });
}
