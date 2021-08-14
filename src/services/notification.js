import api from './api';

export const list = (page, filters) => {
  return api.get('/notifications', {
    params: {
      page,
      limit: 10,
      ...filters,
    },
  });
};

export const get = (id) => api.get(`/notifications/${id}`);

export function create(data) {
  return api.post('/notifications', data);
}

export function destroy(id) {
  return api.delete(`/notifications/${id}`);
}

export default {
  get,
  list,
  create,
  destroy,
};