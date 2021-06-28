import api from './api';

export const list = (page, filters) => {
  return api.get('/workout-profiles', {
    params: {
      page,
      limit: 10,
      ...filters,
    },
  });
};

export const get = (id) => api.get(`/workout-profiles/${id}`);

export function create(data) {
  return api.post('/workout-profiles', data);
}

export function update({ id, ...data }) {
  return api.put(`/workout-profiles/${id}`, data);
}

export function destroy(id) {
  return api.delete(`/workout-profiles/${id}`);
}

export default {
  get,
  list,
  create,
  update,
  destroy,
};
