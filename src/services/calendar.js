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

export default {
  index,
  get,
};
