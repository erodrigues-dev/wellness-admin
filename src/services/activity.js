import { sanitize } from '~/helpers/sanitize';

import api from './api';

const ENDPOINT = '/activities';
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

export function create({
  name,
  description,
  price,
  duration,
  employeeId,
  image,
}) {
  const data = new FormData();

  data.append('name', name);
  data.append('description', description);
  data.append('price', sanitize.number(price));
  data.append('duration', sanitize.number(duration));
  data.append('employeeId', employeeId);
  if (image) data.append('image', image);

  return api.post(ENDPOINT, data);
}

export function update({
  id,
  name,
  description,
  price,
  duration,
  employeeId,
  image,
}) {
  const data = new FormData();

  data.append('id', id);
  data.append('name', name);
  data.append('description', description);
  data.append('price', sanitize.number(price));
  data.append('duration', sanitize.number(duration));
  data.append('employeeId', employeeId);
  if (image) data.append('image', image);

  return api.put(ENDPOINT, data);
}
