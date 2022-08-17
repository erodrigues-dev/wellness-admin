import api from './api';

export function getAppointment(id) {
  return api.get(`/scheduler/appointments/${id}`);
}

export async function createAppointment({
  calendarId,
  activityId,
  dateStart,
  customerId,
  notes,
  calendarClassId,
}) {
  const response = await api.post('/scheduler/appointments', {
    calendarId,
    activityId,
    dateStart,
    customerId,
    notes,
    calendarClassId,
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
  await api.post(`/scheduler/appointments/${id}/cancel`);
}

export async function checkAppointmentAvailability({
  calendarId,
  activityId,
  ignoreAppointmentId,
  date,
}) {
  const response = await api.post(
    `/scheduler/appointments/check-availability`,
    {
      calendarId,
      activityId,
      ignoreAppointmentId,
      date,
    }
  );

  return response;
}

export async function updateAppointmentPartially({
  id,
  notes,
  calendarLabelId,
}) {
  const response = await api.patch(`/scheduler/appointments/${id}`, {
    notes,
    calendarLabelId,
  });

  return response;
}
