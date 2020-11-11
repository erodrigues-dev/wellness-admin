import api from './api';

const ENDPOINT = '/orders';
const LIMIT = 10;

export function list(page, filter) {
  return api.get(ENDPOINT, {
    params: {
      ...filter,
      page,
      limit: LIMIT,
    },
  });
}

export default {
  list,
};
