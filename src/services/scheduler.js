import api from './api';

export function listActivities(calendarId) {
  return api.get(`/calendars/${calendarId}/activities`);
}

export default {
  listActivities,
};
