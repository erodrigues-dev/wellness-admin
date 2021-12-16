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
  const sendData = { ...data };
  if (sendData.type === 'customer') sendData.teamGroupId = undefined;
  if (sendData.type === 'team-group') sendData.customerId = undefined;

  return api.post('/workout-profiles', sendData);
}

export function update(data) {
  const { id, type, customerId, teamGroupId, ...payload } = data;
  return api.put(`/workout-profiles/${id}`, payload);
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
