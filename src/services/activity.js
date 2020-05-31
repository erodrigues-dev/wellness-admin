import { sanitize } from '~/helpers/sanitize';

import api from './api';

const ENDPOINT = '/activities';
const LIMIT = 10;

export function list(page, filters) {
  return api.get(ENDPOINT, {
    params: {
      page,
      limit: LIMIT,
      ...filters,
    },
  });
}

export function listAll(filters) {
  return api.get(ENDPOINT, {
    params: {
      ...filters,
    },
  });
}

export function get(id) {
  return api.get(`${ENDPOINT}/${id}`);
}

export function create({ name, description, price, duration, employeeId }) {
  return api.post(ENDPOINT, {
    name,
    description,
    price: sanitize.number(price),
    duration: sanitize.number(duration),
    employeeId,
  });
}

export function update({ id, name, description, price, duration, employeeId }) {
  return api.put(ENDPOINT, {
    id,
    name,
    description,
    price: sanitize.number(price),
    duration: sanitize.number(duration),
    employeeId,
  });
}
