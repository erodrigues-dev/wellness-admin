import api from './api';

const ENDPOINT = '/orders';
const LIMIT = 10;

export function index(page, filter) {
  return api.get(ENDPOINT, {
    params: {
      ...filter,
      page,
      limit: LIMIT,
    },
  });
}

export function get(id) {
  return api.get(`${ENDPOINT}/${id}`);
}

export function payWithMoney(data) {
  return api.post(`${ENDPOINT}/pay-with-money`, data);
}

export default {
  index,
  get,
  payWithMoney,
};
