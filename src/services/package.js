import { sanitize } from '~/helpers/sanitize';

import api from './api';

const ENDPOINT = '/packages';
const LIMIT = 10;

function index(page, filters) {
  return api.get(ENDPOINT, {
    params: {
      page,
      limit: LIMIT,
      ...filters,
    },
  });
}

function get(id) {
  return api.get(`${ENDPOINT}/${id}`);
}

function create({ name, description, price, activities }) {
  return api.post(ENDPOINT, {
    name,
    description,
    price: sanitize.number(price),
    activities: activities.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    })),
  });
}

function update({ id, name, description, price, activities }) {
  return api.put(ENDPOINT, {
    id,
    name,
    description,
    price: sanitize.number(price),
    activities: activities.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    })),
  });
}

const service = {
  index,
  get,
  create,
  update,
};

export default service;
