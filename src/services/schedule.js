import api from './api';

const route = '/activities-schedules';

/**
 * schedule list
 * @param {Date} start
 * @param {Date} end
 * @param {number} activityId
 */
export function list(start, end, activityId) {
  const params = {
    start: start.toISOString(),
    end: end.toISOString(),
    activityId,
  };

  return api.get(route, { params });
}

export function create(data) {
  return api.post(route, data);
}

export function udpate(data) {
  return api.put(route, data);
}

export function destroy(id) {
  return api.delete(`${route}/${id}`);
}
