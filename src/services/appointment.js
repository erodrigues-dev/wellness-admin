import api from './api';

export function list(page, limit, filters) {
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
  return api.get(`/activities/${activityId}/schedules/days/${date}/times`);
}

export function create(data) {
  return api.post(`/schedules`, data);
}

export function changeStatus(id, status) {
  return api.put(`/schedules/${id}/change-status/${status}`);
}

const service = {
  customerActivities,
  create,
};

export default service;
