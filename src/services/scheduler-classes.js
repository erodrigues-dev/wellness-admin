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

export async function updateClass({
  id,
  calendarId,
  activityId,
  dateStart,
  slots,
  recurrenceRule,
  color,
  notes,
}) {
  const response = await api.put(`/scheduler/classes/${id}`, {
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

export async function getClassById(id) {
  const response = await api.get(`/scheduler/classes/${id}`);

  return response;
}
