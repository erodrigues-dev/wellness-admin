import api from './api';

export async function listItems({ calendars, date }) {
  const { data } = await api.get('/scheduler/items', {
    params: { calendars, date },
  });

  return data;
}

export function listActivities(calendarId) {
  return api.get(`/calendars/${calendarId}/activities`);
}

export default {
  listActivities,
  listItems,
};
