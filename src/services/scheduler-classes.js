import api from './api';

export async function createClass({
  calendarId,
  activityId,
  dateStart,
  slots,
  recurrenceRule,
  color,
  notes,
}) {
  const response = await api.post(`/scheduler/classes`, {
    calendarId,
    activityId,
    dateStart,
    slots,
    color,
    notes,
    recurrenceRule,
  });

  return response;
}

export function updateClass({ id, ...data }) {
  return api.put(`/scheduler/classes/${id}`, data);
}

export async function getClassById(id) {
  const response = await api.get(`/scheduler/classes/${id}`);

  return response;
}

export async function getAppointmentsList(id) {
  const response = await api.get(`/scheduler/classes/${id}/appointments`);

  return response;
}

export async function deleteClass(id, following) {
  await api.delete(`/scheduler/classes/${id}`, {
    params: { following },
  });
}
