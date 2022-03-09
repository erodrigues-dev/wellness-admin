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

export async function listItems({ calendars, date }) {
  const response = await api.get('/scheduler/items', {
    params: { calendars, date },
  });

  return response;
}

export async function listSlots(calendars) {
  const response = await api.get('/scheduler/slots', {
    params: { calendars },
  });

  return response;
}

export async function getItemById(id) {
  const response = await api.get(`/scheduler/items/${id}`);

  return response;
}

export async function createAppointment({
  calendarId,
  activityId,
  dateStart,
  customerId,
  notes,
}) {
  const response = await api.post('/scheduler/appointments', {
    calendarId,
    activityId,
    dateStart,
    customerId,
    notes,
  });

  return response;
}

export async function updateAppointment({
  id,
  calendarClassId,
  calendarId,
  activityId,
  dateStart,
  customerId,
  calendarLabelId,
  notes,
}) {
  const response = await api.put(`/scheduler/appointments/${id}`, {
    calendarClassId,
    calendarId,
    activityId,
    dateStart,
    customerId,
    calendarLabelId: calendarLabelId || null,
    notes,
  });

  return response;
}

export async function cancelAppointment(id) {
  const response = await api.put(`/scheduler/appointments/${id}/cancel`);

  return response;
}

export default {
  listCalendars,
  listActivities,
  listSlots,
  listItems,
  getItemById,
  createAppointment,
  updateAppointment,
  cancelAppointment,
};
