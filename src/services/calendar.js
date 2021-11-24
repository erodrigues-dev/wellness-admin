import { config } from '~/helpers/config';

import api from './api';

const { limit } = config;

function index({ page, filters }) {
  return api.get('/calendars', {
    params: {
      page,
      limit,
      ...filters,
    },
  });
}

function get(id) {
  return api.get(`/calendars/${id}`);
}

function create(data) {
  return api.post('/calendars', data);
}

function update({ id, ...data }) {
  return api.put(`/calendars/${id}`, data);
}

function destroy(id) {
  return api.delete(`/calendars/${id}`);
}

export default {
  index,
  get,
  create,
  update,
  destroy,
};
