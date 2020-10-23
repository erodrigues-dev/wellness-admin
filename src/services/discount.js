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
  const formData = new FormData();

  formData.append('customerId', customerId);
  formData.append('type', type);
  formData.append('value', value);
  formData.append('relationType', relationType);
  formData.append('relationId', relationId);

  return api.post(ENDPOINT, formData);
}

export function update({
  id,
  customerId,
  type,
  value,
  relationType,
  relationId,
}) {
  const formData = new FormData();

  formData.append('id', id);
  formData.append('customerId', customerId);
  formData.append('type', type);
  formData.append('value', value);
  formData.append('relationType', relationType);
  formData.append('relationId', relationId);

  return api.put(ENDPOINT, formData);
}

const service = {
  listAll,
  get,
  create,
  update,
};

export default service;
