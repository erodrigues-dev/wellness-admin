import api from './api';

const ENDPOINT = '/categories';
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

export function create(name, type) {
  return api.post(ENDPOINT, { name, type });
}

export function update(id, name) {
  return api.put(ENDPOINT, { id, name });
}

const service = {
  list: index,
  listAll,
  get,
  create,
  update,
};

export default service;
