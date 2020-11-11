import api from './api';

const ENDPOINT = '/checkout';

export function calculateDiscount(data) {
  return api.post(`${ENDPOINT}/calculate-discount`, data);
}

export function payWithMoney(data) {
  return api.post(`${ENDPOINT}/pay-with-money`, data);
}

export function payWithCard(data) {
  return api.post(`${ENDPOINT}/pay-with-card`, data);
}

export default {
  payWithMoney,
};
