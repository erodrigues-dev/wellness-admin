import api from './api';

const ENDPOINT = '/activities';
const LIMIT = 10;

function sanitizeNumber(value) {
  if (typeof value === 'number') return value;

  if (!value) return null;

  return parseFloat(value.replace(/,/g, ''));
}

export function index(page, filters) {
  return api.get(ENDPOINT, {
    params: {
      page,
      limit: LIMIT,
      ...filters,
    },
  });
}

export function get(id) {
  return api.get(`${ENDPOINT}/${id}`);
}

export function create({ name, description, price, duration }) {
  return api.post(ENDPOINT, {
    name,
    description,
    price: sanitizeNumber(price),
    duration: sanitizeNumber(duration),
  });
}

export function update({ id, name, description, price, duration }) {
  return api.put(ENDPOINT, {
    id,
    name,
    description,
    price: sanitizeNumber(price),
    duration: sanitizeNumber(duration),
  });
}
