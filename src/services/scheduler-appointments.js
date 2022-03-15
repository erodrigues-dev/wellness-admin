import api from './api';

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

export async function checkAppointmentAvailability({
  calendarId,
  ignoreAppointmentId,
  date,
}) {
  const response = await api.post(
    `/scheduler/appointments/check-availability`,
    {
      calendarId,
      ignoreAppointmentId,
      date,
    }
  );

  return response;
}
