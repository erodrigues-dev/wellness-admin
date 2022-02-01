import { config } from '~/helpers/config';

import api from './api';

const { pageLimit } = config;

function index({ page, filters } = {}) {
  return api.get('/calendars', {
    params: {
      page,
      limit: pageLimit,
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

function listActivities(calendarId) {
  return api.get(`/calendars/${calendarId}/activities`);
}

export default {
  index,
  get,
  create,
  update,
  destroy,
  listActivities,
};
