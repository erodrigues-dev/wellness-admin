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

export function create(name) {
  return api.post(ENDPOINT, { name });
}

export function update({ id, name }) {
  const formData = new FormData();

  formData.append('id', id);
  formData.append('name', name);

  return api.put(ENDPOINT, formData);
}

const service = {
  list: index,
  listAll,
  get,
  create,
  update,
};

export default service;
