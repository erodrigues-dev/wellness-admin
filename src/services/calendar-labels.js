import api from './api';

export async function listCalendarLabels() {
  const response = await api.get('/calendar-labels');

  return response;
}

export async function createCalendarLabel(item) {
  const response = await api.post('/calendar-labels', item);

  return response;
}

export async function updateCalendarLabel(id, item) {
  const response = await api.put(`/calendar-labels/${id}`, item);

  return response;
}

export async function deleteCalendarLabel(id) {
  const response = await api.put(`/calendar-labels/${id}`);

  return response;
}

export default {
  listCalendarLabels,
  createCalendarLabel,
  updateCalendarLabel,
  deleteCalendarLabel,
};
