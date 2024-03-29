import api from './api';

const list = (page, limit, customerId) => {
  return api.get(`/customers/${customerId}/waivers`, {
    params: {
      page,
      limit,
    },
  });
};

const get = (customerId, waiverId) =>
  api.get(`/customers/${customerId}/waivers/${waiverId}`);

const getByActivity = (customerId, activityId) =>
  api.get(`/customers/${customerId}/waivers/activity/${activityId}`);

const add = (customerId, waiverId) =>
  api.post(`/customers/${customerId}/waivers`, { waiverId });

const remove = (customerId, waiverId) =>
  api.delete(`/customers/${customerId}/waivers/${waiverId}`);

const sign = ({ customerId, waiverId, signImage }) => {
  const data = new FormData();
  data.append('waiverId', waiverId);
  data.append('signImage', signImage, 'sign.png');

  return api.put(`/customers/${customerId}/waivers`, data);
};

export default {
  list,
  get,
  getByActivity,
  add,
  remove,
  sign,
};
