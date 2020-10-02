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
}) {
  const data = new FormData();
  data.append('name', name);
  data.append('description', description);
  if (expiration) data.append('expiration', expiration);
  data.append('showInApp', showInApp);
  data.append('showInWeb', showInWeb);
  data.append('price', sanitize.number(price));
  data.append('categoryId', categoryId);

  activities.map((item) =>
    data.append(
      'activities[]',
      JSON.stringify({
        id: item.id,
        quantity: item.quantity,
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

  activities.map((item) =>
    data.append(
      'activities[]',
      JSON.stringify({
        id: item.id,
        quantity: item.quantity,
      })
    )
  );

  if (image) data.append('image', image);

  return api.put(ENDPOINT, data);
}

const service = {
  index,
  get,
  create,
  update,
};

export default service;
