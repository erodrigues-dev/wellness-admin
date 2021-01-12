import api from './api';

const ENDPOINT = '/orders';

export function list(page, limit, filter, cancelToken) {
  return api.get(ENDPOINT, {
    params: {
      ...filter,
      page,
      limit,
    },
    cancelToken,
  });
}

export function get(id) {
  return api.get(`${ENDPOINT}/${id}`);
}

export function cancel(id) {
  return api.put(`${ENDPOINT}/${id}/cancel`);
}

export default {
  list,
};
