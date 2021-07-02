import api from './api';

export const list = (page, filters) => {
  return api.get('/workout-logs', {
    params: {
      page,
      limit: 10,
      ...filters,
    },
  });
};

export const get = (id) => api.get(`/workout-logs/${id}`);

export function create(data) {
  return api.post('/workout-logs', data);
}

export function update({ id, ...data }) {
  const payload = { ...data };
  delete payload.customerId;
  return api.put(`/workout-logs/${id}`, payload);
}

export function destroy(id) {
  return api.delete(`/workout-logs/${id}`);
}

export default {
  get,
  list,
  create,
  update,
  destroy,
};
