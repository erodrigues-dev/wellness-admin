import { sanitize } from '~/helpers/sanitize';

import api from './api';

const ENDPOINT = '/packages';
const LIMIT = 10;

function index(page, filters) {
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

function get(id) {
  return api.get(`${ENDPOINT}/${id}`);
}

function create({
  name,
  description,
  price,
  expiration,
  showInApp,
  showInWeb,
  activities,
  image,
  categoryId,
  recurrencyPay,
  type,
  total,
}) {
  const data = new FormData();
  data.append('name', name);
  data.append('description', description);
  if (expiration) data.append('expiration', expiration);
  data.append('showInApp', showInApp);
  data.append('showInWeb', showInWeb);
  data.append('price', sanitize.number(price));
  data.append('categoryId', categoryId);
  data.append('recurrencyPay', recurrencyPay);
  data.append('type', type);
  if ((total && type === 'minutes') || type === 'amount')
    data.append('total', total);

  activities.map((item) =>
    data.append(
      'activities[]',
      type === 'appointments'
        ? JSON.stringify({
            id: item.id,
            quantity: item.quantity,
          })
        : JSON.stringify({
            id: item.id,
          })
    )
  );

  if (image) data.append('image', image);

  return api.post(ENDPOINT, data);
}

function update({
  id,
  name,
  description,
  price,
  expiration,
  showInApp,
  showInWeb,
  activities,
  image,
  categoryId,
  recurrencyPay,
  type,
  total,
}) {
  const data = new FormData();
  data.append('id', id);
  data.append('name', name);
  data.append('description', description);
  if (expiration) data.append('expiration', expiration);
  data.append('showInApp', showInApp);
  data.append('showInWeb', showInWeb);
  data.append('price', sanitize.number(price));
  data.append('categoryId', categoryId);
  data.append('recurrencyPay', recurrencyPay);
  data.append('type', type);
  if (type === 'minutes' || type === 'amount') data.append('total', total);

  activities.map((item) =>
    data.append(
      'activities[]',
      type === 'appointments'
        ? JSON.stringify({
            id: item.id,
            quantity: item.quantity,
          })
        : JSON.stringify({
            id: item.id,
          })
    )
  );

  if (image) data.append('image', image);

  return api.put(ENDPOINT, data);
}

function destroy(id) {
  return api.delete(`${ENDPOINT}/${id}`);
}

const service = {
  index,
  get,
  create,
  update,
  destroy,
};

export default service;
