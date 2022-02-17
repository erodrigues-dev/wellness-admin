import api from './api';

export async function listCalendars() {
  const response = await api.get('/scheduler/calendars');

  return response;
}

export async function listActivities(calendarId) {
  const response = await api.get(
    `/scheduler/calendars/${calendarId}/activities`
  );

  return response;
}

export async function listSlots(calendars) {
  const response = await api.get('/scheduler/slots', {
    params: { calendars },
  });

  return response;
}

export async function listItems({ calendars, date }) {
  const response = await api.get('/scheduler/items', {
    params: { calendars, date },
  });

  return response;
}

export async function getItemById(id) {
  const response = await api.get(`/scheduler/items/${id}`);

  return response;
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
