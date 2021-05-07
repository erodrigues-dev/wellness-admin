import api from './api';

export const list = (page, filters) => {
  return api.get('/waivers', {
    params: {
      page,
      limit: 10,
      ...filters,
    },
  });
};

export const get = (id) => api.get(`/waivers/${id}`);

export function listAll() {
  return api.get('/waivers');
}

export function create(data) {
  return api.post('/waivers', data);
}

export function update(data) {
  return api.put('/waivers', data);
}

export function destroy(id) {
  return api.delete(`/waivers/${id}`);
}

export default {
  get,
  list,
  listAll,
  create,
  update,
  destroy,
};
