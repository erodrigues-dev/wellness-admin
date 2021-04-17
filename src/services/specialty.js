import api from './api';

export function list(page, filters) {
  return api.get('/specialties', {
    params: {
      page,
      limit: 10,
      ...filters,
    },
  });
}

export function listAll() {
  return api.get('/specialties');
}

export function create(data) {
  return api.post('/specialties', data);
}

export function update(data) {
  return api.put('/specialties', data);
}

export function destroy(id) {
  return api.delete(`/specialties/${id}`);
}

export default {
  list,
  listAll,
  create,
  update,
  destroy,
};
