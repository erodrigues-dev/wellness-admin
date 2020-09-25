import { sanitize } from '~/helpers/sanitize';

import api from './api';

const LIMIT = 10;

const endpoint = (id) => `/customers/${id}/custom-packages`;

export function index(customerId, page, filter) {
  return api.get(endpoint(customerId), {
    params: { ...filter, page, limit: LIMIT },
  });
}

export function get(customerId, id) {
  return api.get(`${endpoint(customerId)}/${id}`);
}

export function create(customerId, data) {
  return api.post(endpoint(customerId), {
    name: data.name,
    description: data.description,
    price: sanitize.number(data.price),
    expiration: data.expiration || undefined,
    activities: data.activities.map(({ id, quantity }) => ({
      id,
      quantity,
    })),
  });
}

export function update(customerId, data) {
  return api.put(endpoint(customerId), {
    id: data.id,
    name: data.name,
    description: data.description,
    price: sanitize.number(data.price),
    expiration: data.expiration || undefined,
    activities: data.activities.map(({ id, quantity }) => ({
      id,
      quantity,
    })),
  });
}

export default {
  index,
  get,
  create,
  update,
};
