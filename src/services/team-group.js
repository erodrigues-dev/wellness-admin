import { config } from '~/helpers/config';

import api from './api';

export const list = (filters) =>
  api.get('/team-groups', {
    params: {
      limit: config.pageLimit,
      ...filters,
    },
  });

export const get = (id) => api.get(`/team-groups/${id}`);
export const create = (data) => api.post('/team-groups', data);
export const update = ({ id, ...data }) => api.put(`/team-groups/${id}`, data);
export const destroy = (id) => api.delete(`/team-groups/${id}`);

export default {
  list,
  get,
  create,
  update,
  destroy,
};
