import { toInputValue } from '~/helpers/date';

import api from './api';

export function list(page, limit, filter) {
  const filters = filter;

  return api.get('/schedules', {
    params: {
      page,
      limit,
      ...filters,
    },
  });
}

export function customerActivities(customerId) {
  return api.get(`/customers/${customerId}/activities`);
}

export function listDates(activityId, start, end) {
  const params = {
    start,
    end,
  };

  return api.get(`/activities/${activityId}/schedules/days`, { params });
}

export function listAvailableTimeSlots(activityId, date) {
  return api.get(
    `/activities/${activityId}/schedules/days/${toInputValue(date)}/times`
  );
}

export function create(data) {
  return api.post(`/schedules`, data);
}

export function cancel(id) {
  return api.put(`/schedules/${id}/cancel`);
}

const service = {
  customerActivities,
  create,
};

export default service;
