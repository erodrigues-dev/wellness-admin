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

export const employees = (q, specialties) => {
  return api.get('autocomplete/employees', {
    params: { q, specialties },
    disableGlobalLoading: true,
  });
};

export const specialties = (q) => {
  return api.get('autocomplete/specialties', {
    params: { q },
    disableGlobalLoading: true,
  });
};

export const activities = (q) => {
  return api.get('autocomplete/activities', {
    params: { q },
    disableGlobalLoading: true,
  });
};

export default {
  employees,
  customers,
  teamGroups,
  specialties,
  activities,
};
