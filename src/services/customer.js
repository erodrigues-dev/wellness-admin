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

export function create(customer) {
  const data = new FormData();

  data.append('name', customer.name);
  data.append('email', customer.email);
  data.append('phone', customer.phone);
  data.append('privateNotes', customer.privateNotes);
  data.append('publicNotes', customer.publicNotes);
  if (customer.file) data.append('image', customer.file);

  return api.post(ENDPOINT, data);
}

export function update(customer) {
  const data = new FormData();

  data.append('id', customer.id);
  data.append('name', customer.name);
  data.append('phone', customer.phone);
  data.append('privateNotes', customer.privateNotes);
  data.append('publicNotes', customer.publicNotes);
  if (customer.file) data.append('image', customer.file);

  return api.put(ENDPOINT, data);
}

export function destroy(id) {
  return api.delete(`${ENDPOINT}/${id}`);
}

export default {
  index,
  listAll,
  get,
  create,
  update,
  destroy,
};
