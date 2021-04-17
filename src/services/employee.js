import api from './api';

const ENDPOINT = '/employees';
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

export function create({ name, email, phone, profileId, specialtyId, file }) {
  const formData = new FormData();

  formData.append('name', name);
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('profileId', profileId);
  if (specialtyId) formData.append('specialtyId', specialtyId);
  if (file) formData.append('image', file);

  return api.post(ENDPOINT, formData);
}

export function update({ id, name, phone, profileId, specialtyId, file }) {
  const formData = new FormData();

  formData.append('id', id);
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('profileId', profileId);
  if (specialtyId) formData.append('specialtyId', specialtyId);
  if (file) formData.append('image', file);

  return api.put(ENDPOINT, formData);
}

export function destroy({ id }) {
  return api.delete(`${ENDPOINT}/${id}`);
}

const service = {
  list,
  listAll,
  get,
  create,
  update,
  destroy,
};

export default service;
