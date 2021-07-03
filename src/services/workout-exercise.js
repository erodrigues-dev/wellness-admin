import api from './api';

export const list = (page, filters) => {
  return api.get('/workout-exercises', {
    params: {
      page,
      limit: 10,
      ...filters,
    },
  });
};

export const get = (id) => api.get(`/workout-exercises/${id}`);

export function create(data) {
  return api.post('/workout-exercises', data);
}

export function update({ id, ...data }) {
  const payload = { ...data };
  delete payload.workoutLogId;
  return api.put(`/workout-exercises/${id}`, payload);
}

export function destroy(id) {
  return api.delete(`/workout-exercises/${id}`);
}

export default {
  get,
  list,
  create,
  update,
  destroy,
};
