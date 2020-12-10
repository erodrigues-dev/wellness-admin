import api from './api';

// const LIMIT = 10;

export function customerActivities(customerId) {
  return api.get(`/customer/${customerId}/activities`);
}

// export function listAll(filters) {
//   return api.get(ENDPOINT, {
//     params: {
//       ...filters,
//     },
//   });
// }

export function create({ customerId, data }) {
  return api.post(`/customer/${customerId}/schedule`, {
    customerId,
    data,
  });
}

const service = {
  customerActivities,
  create,
};

export default service;
