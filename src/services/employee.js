import api from './api';

const ENDPOINT = '/employees';

export function get(id) {
  return api.get(`${ENDPOINT}/${id}`);
}

export function create({ name, email, password }) {
  return api.post(ENDPOINT, {
    name,
    email,
    password,
  });
}

export function update({ id, name, email, password }) {
  return api.put(ENDPOINT, {
    id,
    name,
    email,
    password,
  });
}
