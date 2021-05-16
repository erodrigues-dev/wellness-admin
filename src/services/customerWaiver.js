import api from './api';

const list = (page, limit, customerId) => {
  return api.get(`/customers/${customerId}/waivers`, {
    params: {
      page,
      limit,
    },
  });
};

const add = (customerId, waiverId) =>
  api.post(`/customers/${customerId}/waivers`, { waiverId });

const remove = (customerId, waiverId) =>
  api.delete(`/customers/${customerId}/waivers/${waiverId}`);

const sign = ({ customerId, waiverId, signImage }) => {
  const data = new FormData();
  data.append('waiverId', waiverId);
  data.append('signImage', signImage);

  return api.put(`/customers/${customerId}/waivers`, data);
};

export default {
  list,
  add,
  remove,
  sign,
};
