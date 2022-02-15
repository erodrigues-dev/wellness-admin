import api from './api';

export async function listCalendars() {
  const { data } = await api.get('/scheduler/calendars');

  return data;
}

export async function listActivities(calendarId) {
  const { data } = await api.get(
    `/scheduler/calendars/${calendarId}/activities`
  );

  return data;
}

export async function listSlots(calendars) {
  const { data } = await api.get('/scheduler/slots', {
    params: { calendars },
  });

  return data;
}

export async function listItems({ calendars, date }) {
  const { data } = await api.get('/scheduler/items', {
    params: { calendars, date },
  });

  return data;
}

export async function getItemById(id) {
  const { data } = await api.get(`/scheduler/items/${id}`);

  return data;
}

export async function createItem(item) {
  const response = await api.post('/scheduler/items', item);

  return response;
}

export async function updateItem(id, item) {
  const response = await api.put(`/scheduler/items/${id}`, item);

  return response;
}

export default {
  listCalendars,
  listActivities,
  listSlots,
  listItems,
  getItemById,
  createItem,
  updateItem,
};
