import api from './api';

export const customers = (q) => {
  return api.get('autocomplete/customers', {
    params: { q },
    disableGlobalLoading: true,
  });
};

export default {
  customers,
};
