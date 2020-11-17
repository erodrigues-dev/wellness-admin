import api from './api';

const ENDPOINT = '/orders';

export function list(page, limit, filter) {
  return api.get(ENDPOINT, {
    params: {
      ...filter,
      page,
      limit,
    },
  });
}

export default {
  list,
};
