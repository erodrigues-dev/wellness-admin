import api from './api';

const ENDPOINT = '/employees';
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

export function create({ name, email, phone, profileId, specialty, file }) {
  const formData = new FormData();

  formData.append('name', name);
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('profileId', profileId);
  formData.append('specialty', specialty);
  if (file) formData.append('image', file);

  return api.post(ENDPOINT, formData);
}

export function update({ id, name, phone, profileId, specialty, file }) {
  const formData = new FormData();

  formData.append('id', id);
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('profileId', profileId);
  formData.append('specialty', specialty);
  if (file) formData.append('image', file);

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
