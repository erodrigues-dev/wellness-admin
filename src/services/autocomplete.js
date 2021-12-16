import api from './api';

export const customers = (q) => {
  return api.get('autocomplete/customers', {
    params: { q },
    disableGlobalLoading: true,
  });
};

export const teamGroups = (q) => {
  return api.get('autocomplete/team-groups', {
    params: { q },
    disableGlobalLoading: true,
  });
};

export default {
  customers,
  teamGroups,
};
