import api from './api';

const ENDPOINT = '/customers';
const LIMIT = 10;

export function index(page, filter) {
  return api.get(ENDPOINT, {
    params: {
      ...filter,
      page,
      limit: LIMIT,
    },
  });
}

export function get(id) {
  return api.get(`${ENDPOINT}/${id}`);
}

export function create({ name, email, password, file }) {
  const data = new FormData();

  data.append('name', name);
  data.append('email', email);
  data.append('password', password);
  if (file) data.append('image', file);

  return api.post(ENDPOINT, data);
}

export function update({ id, name, email, password, file }) {
  const data = new FormData();

  data.append('id', id);
  data.append('name', name);
  data.append('email', email);
  data.append('password', password);
  if (file) data.append('image', file);

  return api.put(ENDPOINT, data);
}

export default {
  index,
  get,
  create,
  update,
};
