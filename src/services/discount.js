import api from './api';

const ENDPOINT = '/discounts';
const LIMIT = 10;

export function list(page, filters) {
  return api.get(ENDPOINT, {
    params: {
      page,
      limit: LIMIT,
      ...filters,
    },
  });
}

export function listAll(filters) {
  return api.get(ENDPOINT, {
    params: {
      ...filters,
    },
  });
}

export function get(id) {
  return api.get(`${ENDPOINT}/${id}`);
}

export function create({ customerId, type, value, relationType, relationId }) {
  return api.post(ENDPOINT, {
    customerId,
    type,
    value,
    relationType,
    relationId,
  });
}

export function update({
  id,
  customerId,
  type,
  value,
  relationType,
  relationId,
}) {
  return api.put(ENDPOINT, {
    id,
    customerId,
    type,
    value,
    relationType,
    relationId,
  });
}

export function destroy(id) {
  return api.delete(`${ENDPOINT}/${id}`);
}

const service = {
  listAll,
  get,
  create,
  update,
};

export default service;
