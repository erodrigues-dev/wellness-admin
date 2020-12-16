import masks from '~/helpers/masks';
import api from './api';

// const LIMIT = 10;

export function customerActivities(customerId) {
  return api.get(`/customer/${customerId}/activities`);
}

export function listDates(activityId, start, end) {
  const params = {
    start: start.toISOString(),
    end: end.toISOString(),
  };

  return api.get(`/activities/${activityId}/schedules/days`, { params });
}

export function listAvailableTimeSlots(activityId, date) {
  return api.get(
    `/activities/${activityId}/schedules/days/${masks.date(date)}/times`
  );
}

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
