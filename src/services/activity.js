import { sanitize } from '~/helpers/sanitize';

import api from './api';

const ENDPOINT = '/activities';
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

export function create({ name, description, price, duration }) {
  return api.post(ENDPOINT, {
    name,
    description,
    price: sanitize.number(price),
    duration: sanitize.number(duration),
  });
}

export function update({ id, name, description, price, duration }) {
  return api.put(ENDPOINT, {
    id,
    name,
    description,
    price: sanitize.number(price),
    duration: sanitize.number(duration),
  });
}
