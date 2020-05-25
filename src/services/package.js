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

function create({ name, description, price, duration }) {
  return api.post(ENDPOINT, {
    name,
    description,
    price: sanitize.number(price),
    duration: sanitize.number(duration),
  });
}

function update({ id, name, description, price, duration }) {
  return api.put(ENDPOINT, {
    id,
    name,
    description,
    price: sanitize.number(price),
    duration: sanitize.number(duration),
  });
}

const service = {
  index,
  get,
  create,
  update,
};

export default service;
